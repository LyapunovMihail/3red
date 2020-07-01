import { PlatformDetectService } from './../../../platform-detect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DynamicService } from './dynamic-admin-content.service';
import { IDynamicObject, IObjectDynamicSnippet, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-object-dynamic',
    templateUrl: 'object-dynamic.component.html',
    styleUrls: ['object-dynamic.component.scss'],
    providers: [PlatformDetectService]
})

export class ObjectDynamicComponent implements OnInit, OnDestroy {

    public active = 'process';
    public currentYear: number;
    public currentMonth: number;
    public objectId: string;
    public jk: IObjectSnippet;
    public objectsArray: IDynamicObject[] = [];
    // public objectsArray: any = [];
    public routerEvent;

    public contentSnippet: IObjectDynamicSnippet;
    public tabSnippet: IObjectTabsSnippet;

    public uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    constructor(
        public location: Location,
        private router: Router,
        public activatedRoute: ActivatedRoute,
        public dynamicService: DynamicService,
        public platform: PlatformDetectService
    ) { }

    ngOnInit() {
        if ( this.platform.isBrowser ) {

            this.routerEvent = this.activatedRoute.params.subscribe((params) => {
                this.reviseUrlParams(params);
                this.getSnippet();
                this.getTabSnippet();
                this.getJk();
            });
        }
    }

    public getSnippet() {
        this.dynamicService.getContentSnippet(this.objectId, this.currentYear, this.currentMonth).subscribe(
            (data) => {
                this.setContent(data);
                console.log('dynamic objects!', data);
            },
            (err) => console.error(err)
        );
    }

    public getJk() {
        this.dynamicService.getJk(this.objectId).subscribe(
            (data) => {
                this.jk = data[0];
            },
            (err) => console.error(err)
        );
    }

    public getTabSnippet() {
        this.dynamicService.getTabsSnippetById(this.objectId).subscribe(
            (data) => this.tabSnippet = data,
            (err) => console.error(err)
        );
    }

    public changeTab(tab) {
        this.active = tab;
        this.setContent(this.contentSnippet);
    }

    setContent(data) {
        this.contentSnippet = data;
        if (this.contentSnippet && this.contentSnippet.objects) {
            this.objectsArray = this.active === 'process' ? this.contentSnippet.objects : this.contentSnippet.objects.filter((item) => item.ready === 100 && item.show);
        } else {
            this.objectsArray = [];
        }
    }

    ngOnDestroy() {
        if ( this.platform.isBrowser ) {
            this.routerEvent.unsubscribe();
        }
    }

    // проверка на корректность url - параметров 'year', 'month'
    public reviseUrlParams(params) {
        if ( params.month && params.year && params.id ) {

            this.objectId = params.id;
            // удаляем все символы из параметров кроме чисел ( возможно случайно попавшие )
            const month = params.month.replace(/[^0-9]/g, '');
            const year = params.year.replace(/[^0-9]/g, '');

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
        this.router.navigate([`/objects/list/${this.objectId}/dynamic/${this.currentYear}/${val}`]);
    }

    public yearChange(val) {
        this.router.navigate([`/objects/list/${this.objectId}/dynamic/${val}/${this.currentMonth}`]);
    }
}
