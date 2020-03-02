import { Component, Input, OnInit } from '@angular/core';
import { placement, mockHouse } from './object-flat.config';
import { ObjectFlatService } from './object-flat.service';
import { IObjectFlatSnippet } from '../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'object-flat.component.html',
    styleUrls: [
        'object-flat.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectFlatService]
})

export class ObjectFlatComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    public objectId: string;
    public snippet: IObjectFlatSnippet;
    public switchOn = false;

    constructor(
        private flatService: ObjectFlatService,
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
