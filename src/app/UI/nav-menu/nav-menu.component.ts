import { Component, OnInit, Input, ElementRef, EventEmitter, Output, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-menu',
    templateUrl: 'nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() public navType = 'common'; // Тип навигации
    @Input() public linkType = 'link'; // Тип ссылки для установки вида перехода
    @Input() public navList = []; // Массив пунктов навигации
    @Input() public activePointDefault = 0; // Активный пункт навигации по умолчанию
    @Output() public routeNavigate = new EventEmitter<any>(); // Передача ссылки в родительский компонент

    public widthActive;
    public offsetLeftActive;

    constructor(
        private elRef: ElementRef,
        private ref: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        console.log('navList: ', this.navList);
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout( () => this.defaultElem());
    }

    ngAfterViewInit() {
        setTimeout( () => this.defaultElem(), 100 );
        this.ref.detectChanges();
    }

    public getActiveElement(event) {
        const elem = event.target;

        this.widthActive = elem.offsetWidth;
        this.offsetLeftActive = elem.offsetLeft;
    }

    public route(type, item) {
        const value = item.link ? item.link : item.name;
        if (type === 'link') {
            setTimeout( () => {
                // Устанавливаем счетчик для перехода на другой роут после завершения анимации
                this.router.navigate([value]);
            }, 500);
        } else if (type === 'link' && this.navType === 'decoration') {
            this.routeNavigate.emit(item);
        } else {
            this.routeNavigate.emit(value);
        }
    }

    public defaultElem() {
        const el = this.elRef.nativeElement.querySelector('.active');
        this.widthActive = el && el.offsetWidth ? el.offsetWidth : null;
        this.offsetLeftActive = el && el.offsetLeft ? el.offsetLeft : null;
    }
}
