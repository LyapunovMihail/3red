import { Component, OnInit, Input, ElementRef, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-menu',
    templateUrl: 'nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit, AfterViewInit {

    @Input() public navType = 'common'; // Тип навигации
    @Input() public linkType = 'link'; // Тип ссылки для установки вида перехода
    @Input() public navList = []; // Массив пунктов навигации
    @Input() public activePointDefault = 0; // Активный пункт навигации по умолчанию
    @Input() public delay = 0; // Задержка отклика
    @Output() public routeNavigate = new EventEmitter<any>(); // Передача ссылки в родительский компонент

    public widthActive;
    public offsetLeftActive;

    constructor(
        private elRef: ElementRef,
        private ref: ChangeDetectorRef,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => this.defaultElem());
        this.ref.detectChanges();
    }

    public getActiveElement(event) {
        const elem = event.target;

        this.widthActive = elem.offsetWidth;
        this.offsetLeftActive = elem.offsetLeft;
    }

    public route(type, item) {
        const value = item.link ? item.link : item.name;
        if (type === 'link' && this.navType === 'decoration') {
            this.routeNavigate.emit(item);
        } else if (type === 'link') {
            setTimeout(() => {
                // Устанавливаем счетчик для перехода на другой роут после завершения анимации
                this.router.navigate([value]);
            }, 500);
        } else {
            setTimeout(() => this.routeNavigate.emit(value), this.delay);
        }
    }

    public defaultElem() {
        const el = this.elRef.nativeElement.querySelector('.active');
        this.widthActive = el && el.offsetWidth ? el.offsetWidth : null;
        this.offsetLeftActive = el && el.offsetLeft ? el.offsetLeft : null;
    }
}
