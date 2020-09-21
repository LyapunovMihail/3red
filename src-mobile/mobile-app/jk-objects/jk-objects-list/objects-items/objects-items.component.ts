import { Component, Input, OnInit } from '@angular/core';
import {
    IObjectSnippet,
    OBJECTS_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-jk-objects-items',
    templateUrl: './objects-items.component.html',
    styleUrls: ['./objects-items.component.scss']
})
export class ObjectsItemsComponent implements OnInit {

    @Input()
    public isMainPage = false;
    @Input()
    public snippets: IObjectSnippet[];

    uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    public activeTooltip: string;

    constructor() {
    }

    ngOnInit() {

    }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }

    getFilteredSnippet() {
        const filteredSnippets: IObjectSnippet[] = [];
        if (this.snippets && this.snippets.length > 0) {
            this.snippets.forEach((item) => {
                if (this.isMainPage) {
                    if (item.show_on_main && item.publish) {
                        filteredSnippets.push(item);
                    }
                } else {
                    if (item.publish) {
                        filteredSnippets.push(item);
                    }
                }
            });
        }

        return filteredSnippets;
    }
}
