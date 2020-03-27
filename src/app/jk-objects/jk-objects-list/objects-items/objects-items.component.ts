import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JkObjectsListService } from '../jk-objects-list.service';
import { IObjectSnippet, OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

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

    @Output() public deleteSnippet = new EventEmitter();
    @Output() public redactSnippet = new EventEmitter();
    @Output() public updateSnippet = new EventEmitter();

    uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    public activeTooltip: string;

    constructor(
        private objectsListService: JkObjectsListService
    ) {
    }

    ngOnInit() {

    }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }

}
