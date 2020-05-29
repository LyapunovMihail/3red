import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';

@Component({
    selector: 'app-object-schema-parking',
    templateUrl: 'object-parking-schema.component.html',
    styleUrls: ['./object-parking-schema.component.scss'],
    providers: [ JkObjectsListService ]
})

export class ObjectParkingSchemaComponent implements OnInit {

    public objectId;
    public objectName;

    public fakeInfo = {
        house: 1,
        section: 1,
        floor: 0,
        number: 190,
        space: 13.9,
        price: '1 450 000'
    };

    constructor(
        private route: ActivatedRoute,
        public objectService: JkObjectsListService,
    ) { }

    ngOnInit() {
        this.objectId = this.route.snapshot.params.id;

        this.objectService.getSnippets(this.objectId).subscribe( data => {
            this.objectName = data[0].name;
        });
    }
}
