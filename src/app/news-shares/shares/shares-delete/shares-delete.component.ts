import { AuthorizationObserverService } from '../../../authorization/authorization.observer.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SharesService } from '../shares.service';
import { Share } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Component({
    selector : 'app-shares-delete',
    templateUrl : './shares-delete.component.html',
    styleUrls : [ './shares-delete.component.scss' ]
})

export class SharesDeleteComponent implements OnInit, OnDestroy {

    @Input() public isForm: boolean = false ;

    // вызывается при создании сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() public snippetsChange = new EventEmitter();

    @Input() public redactId: any ;

    @Input() public snippetsArray: Share[] = [] ;

    @Output() public close = new EventEmitter();

    // подписка на авторизацию
    public isAuthorizated: boolean = false ;
    public AuthorizationEvent;

    constructor(
        private authorization: AuthorizationObserverService,
        private sharesService: SharesService,
        public ref: ChangeDetectorRef
    ) { }

    public ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public onSubmit() {

        this.close.emit();
        this.sharesService.deleteShare(this.redactId).subscribe(
            (response) => {
                this.close.emit();
                this.snippetsChange.emit();
            },
            (err) => {
                alert('Что-то пошло не так!');
            }
        );
    }

}
