import { Component, Input, OnInit } from '@angular/core';
import { placement, mockHouse } from './plan.config';
import { PlanService } from './plan.service';
import { IObjectFlatSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'plan.component.html',
    styleUrls: [
        'plan.component.scss',
        '../../jk-objects-item.component.scss'
    ],
    providers: [PlanService]
})

export class PlanComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    public objectId: string;
    public snippet: IObjectFlatSnippet;
    public switchOn = false;

    constructor(
        private flatService: PlanService,
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
