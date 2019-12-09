import { Component, Input, OnInit } from '@angular/core';
import { placement, mockHouse } from './object-flat.config';
import { ObjectsItemFlatService } from './objects-item-flat.service';
import { IObjectFlatSnippet } from '../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'object-item-flat.component.html',
    styleUrls: [
        'object-item-flat.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectsItemFlatService]
})

export class ObjectItemFlatComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    public objectId: string;
    public snippet: IObjectFlatSnippet;
    public switchOn = false;

    constructor(
        private flatService: ObjectsItemFlatService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.flatService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.snippet, objectId: this.objectId, switchOn: this.switchOn};
        this.flatService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
