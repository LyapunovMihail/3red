import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';

@Component({
    selector: 'app-object-list-storage',
    templateUrl: 'object-storage.component.html',
    styleUrls: ['./object-storage.component.scss'],
    providers: [ JkObjectsListService ]
})

export class ObjectStorageListComponent implements OnInit {

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
            console.log('STORAGE', data);
        });
    }
}
