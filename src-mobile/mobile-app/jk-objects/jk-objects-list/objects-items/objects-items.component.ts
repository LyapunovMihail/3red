import { Component, Input } from '@angular/core';
import {
    IObjectSnippet,
    OBJECTS_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-jk-objects-items',
    templateUrl: './objects-items.component.html',
    styleUrls: ['./objects-items.component.scss']
})
export class ObjectsItemsComponent {

    @Input()
    public isMainPage = false;
    @Input()
    public snippets: IObjectSnippet[];
    @Input() public minPriceByMod;

    public uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;
    public activeTooltip: string;

    constructor() { }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }
}
