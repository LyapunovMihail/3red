import { Component, OnInit, Input } from '@angular/core';
import { IDynamicObject } from '../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
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

    constructor() { }

    ngOnInit() { }

    // Скролл до якоря
    public scrollLink(link) {
        link = link.split('').map((item: string) => item.charCodeAt(0)).join(''); // перевожу в цифры так как jquery не распознаёт селектор на русском, а фрагменты ангулара чето тормозят
        if (!$(`#${link}`).length) { return; }
        const destination = $(`#${link}`).offset().top;
        $('html:not(:animated),body:not(:animated)').animate({ scrollTop: destination - 30 }, 500);
        return false;
    }
}
