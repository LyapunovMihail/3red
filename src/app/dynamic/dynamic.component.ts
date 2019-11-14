import { PlatformDetectService } from './../platform-detect.service';
import { AuthorizationObserverService } from './../authorization/authorization.observer.service';
import { IDynamicObject } from '../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { DynamicService } from './dynamic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss'],
    providers: [PlatformDetectService]
})

export class DynamicComponent implements OnInit, OnDestroy {

    public currentYear: number;
    public currentMonth: number;
   // public objectsArray: IDynamicObject[] = [];
    public objectsArray = [];
    public routerEvent;
    public AuthorizationEvent;
    public isAuthorizated: boolean = false;
    public showModalAdmin: boolean = false;

    constructor(
        private router: Router,
        private authorization: AuthorizationObserverService,
        public activatedRoute: ActivatedRoute,
        public dynamicService: DynamicService,
        public platform: PlatformDetectService
    ) { }

    ngOnInit() {
        if ( this.platform.isBrowser ) {
            // подписка на авторизацию
            this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
                this.isAuthorizated = val;
            });

            this.routerEvent = this.activatedRoute.params.subscribe((params) => {
                this.reviseUrlParams(params);
            });

            this.dynamicService.getObjects().subscribe(
                (data: IDynamicObject[]) => this.objectsArray = data,
                (err) => console.error(err)
            );
        }
    }

    ngOnDestroy() {
        if ( this.platform.isBrowser ) {
            this.AuthorizationEvent.unsubscribe();
            this.routerEvent.unsubscribe();
        }
    }

    // проверка на корректность url - параметров 'year', 'month'
    public reviseUrlParams(params) {
        if ( params['month'] && params['year'] ) {

            // удаляем все символы из параметров кроме чисел ( возможно случайно попавшие )
            let month = params['month'].replace(/[^0-9]/g, '');
            let year = params['year'].replace(/[^0-9]/g, '');

            // если в обоих параметрах есть цифры
            if ( month.length > 0 && year.length > 0
                // проверяем 'year' на соответствие диапазону от 2017го до текущего года
                && Number(year) >= 2019 && Number(year) <= Number(new Date().getFullYear())
                // проверяем 'month' на соответствие диапазону от 1 до 12
                && Number(month) >= 1 && Number(month) <= 12 ) {

                // если все ок, то назначаем свойства
                this.currentMonth = Number(month);
                this.currentYear = Number(year);

                return true;

            // иначе редирект на 404ю страницу
            // и отписка от событий роутера
            } else {
                this.router.navigate(['/error-404'], { skipLocationChange: true });
                return false;
            }
        } else {
            this.router.navigate(['/error-404'], { skipLocationChange: true });
            return false;
        }
    }

    public monthChange(val) {
        this.router.navigate([`/dynamic/${this.currentYear}/${val}`]);
    }

    public yearChange(val) {
        this.router.navigate([`/dynamic/${val}/${this.currentMonth}`]);
    }
}
