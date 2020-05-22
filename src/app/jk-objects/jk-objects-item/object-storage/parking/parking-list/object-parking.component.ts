import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';

@Component({
    selector: 'app-object-list-parking',
    templateUrl: 'object-parking.component.html',
    styleUrls: ['./object-parking.component.scss'],
    providers: [ JkObjectsListService ]
})

export class ObjectParkingListComponent implements OnInit {

    public objectId;
    public objectName;

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
