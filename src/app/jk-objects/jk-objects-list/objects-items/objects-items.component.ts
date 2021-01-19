import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JkObjectsListService } from '../jk-objects-list.service';
import {
    IObjectSnippet,
    OBJECTS_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-jk-objects-items',
    templateUrl: './objects-items.component.html',
    styleUrls: ['./objects-items.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class ObjectsItemsComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    public snippets: IObjectSnippet[];
    @Input()
    public isMainPage = false;
    @Input()
    public minPriceByMod;

    @Output() public deleteSnippet = new EventEmitter();
    @Output() public redactSnippet = new EventEmitter();
    @Output() public updateSnippet = new EventEmitter();

    uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    public activeTooltip: string;

    constructor() {}
    ngOnInit() {}

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }

    public setIlike(ev, snippet) {
        snippet.ilike = ev.target.checked;
        this.updateSnippet.emit(snippet);
    }
}
