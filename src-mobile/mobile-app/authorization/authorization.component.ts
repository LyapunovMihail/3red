import { PlatformDetectService } from './../platform-detect.service';
import { AuthorizationObserverService } from './authorization.observer.service';
import { WindowScrollLocker } from './../commons/window-scroll-block';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from './authorization.service';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss'],
    providers: [
        AuthorizationService,
        WindowScrollLocker,
        FormBuilder,
        PlatformDetectService
    ]
})

export class AuthorizationComponent implements OnInit {

    isShowForm: boolean = false;

    formLogin: FormGroup;

    isAuthorizated: boolean = false;

    constructor(
        private authorization: AuthorizationObserverService,
        private authorizationService: AuthorizationService,
        private scrollLocker: WindowScrollLocker,
        private fb: FormBuilder,
        private platform: PlatformDetectService
    ) { }

    ngOnInit ( ) {
        if ( this.platform.isBrowser ) {
            let token = sessionStorage.getItem('token');
            if (token) {
                this.authorizationService.reviuseToken(token).subscribe(
                    (data) => this.setState(data),
                    (error) => console.error(error)
                );
            }
        }
        this.formLogin = this.fb.group({
            login : '',
            password : ''
        });
    }

    public setState(data) {
        if ( data.result ) {
            // если результат положительный
            this.isAuthorizated = data.result;
            // через обсервер AuthorizationObserverService
            // значение раздается подписчикам
            this.authorization.setAuthorization(data.result);
            // значение токена записывается
            sessionStorage.setItem('token', data.token);
        } else {
            // при отрицательном результате
            // (по идее его быть не может, должна ошибка выкинуться, но все же)
            // токен очищается
            this.isAuthorizated = false;
            sessionStorage.clear();
        }
    }

    // при закрытии окна
    close ( ) {
        // разблокируется скролл
        this.isShowForm = false;
        this.scrollLocker.unblock();
    }

    // при отправке формы
    onSubmit ( form: NgForm ) {
        this.close();
        this.authorizationService.login(form).subscribe(
            (data) => {
                if ( data.result ) {
                    // если результат положительный
                    this.isAuthorizated = data.result;
                    // через обсервер AuthorizationObserverService
                    // значение раздается подписчикам
                    this.authorization.setAuthorization(data.result);
                    // значение токена записывается
                    sessionStorage.setItem('token', data.token);
                } else {
                    // при отрицательном результате
                    // (по идее его быть не может, должна ошибка выкинуться, но все же)
                    // токен очищается
                    this.isAuthorizated = false;
                    sessionStorage.clear();
                }
            },
            (error) => console.error(error)
        );
    }

    // при нажатии комбинации клавиш
    codes = ["G".charCodeAt(0),"O".charCodeAt(0)];
    pressed = {};
    @HostListener ( 'document:keydown', ['$event'] )
    docKeydown ( $event ) {
        this.pressed[$event.keyCode] = true;
        // если клавиши верны и клиент не авторизован
        if ( !this.codes.some((c) => !this.pressed[c]) ) {
            if ( !this.isAuthorizated ) {
                this.pressed = {};
                // блокируется скролл, сбрасывается значение формы
                this.formLogin.reset();
                this.scrollLocker.block();
                // и открывается окно авторизации
                this.isShowForm = true;
            } else {
                this.authorization.setAuthorization(false);
                this.isShowForm = false;
                this.isAuthorizated = false;
                sessionStorage.clear();
            }
        }
    }

    @HostListener ( 'document:keyup', ['$event'] )
    docKeyup ( $event ) {
        delete this.pressed[$event.keyCode];
    }
}
