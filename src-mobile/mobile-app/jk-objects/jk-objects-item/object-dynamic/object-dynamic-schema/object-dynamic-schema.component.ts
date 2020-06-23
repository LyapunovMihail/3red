import { Component, OnInit, Input } from '@angular/core';
import { IDynamicObject } from '../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { ViewportScroller } from '@angular/common';
declare let $: any;

@Component({
    selector: 'app-object-dynamic-schema',
    templateUrl: 'object-dynamic-schema.component.html',
    styleUrls: ['object-dynamic-schema.component.scss']
})

export class ObjectDynamicSchemaComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input() public objectsArray: IDynamicObject[];

    constructor(
        private viewportScroller: ViewportScroller
    ) { }

    ngOnInit() { }

    // Скролл до якоря
    public scrollLink(link) {
        link = link.split('').map((item: string) => item.charCodeAt(0)).join(''); // перевожу в цифры так как jquery не распознаёт селектор на русском, а фрагменты ангулара чето тормозят
        if (!$(`#${link}`).length) { return; }
        const destination = $(`#${link}`).offset().top;
        this.viewportScroller.scrollToPosition([0, destination - 30]);
        return false;
    }
}
