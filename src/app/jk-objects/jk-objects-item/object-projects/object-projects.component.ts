import { Component, OnInit, Input } from '@angular/core';
import { project } from './mockProject';
import { JkObjectsListService } from '../../jk-objects-list/jk-objects-list.service';
import { OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

export interface IObjectSnippet {
    status: string;
    minPrice: any;
}

@Component({
    selector: 'app-object-item-projects',
    templateUrl: 'object-projects.component.html',
    styleUrls: [
        'object-projects.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        JkObjectsListService
    ]
})

export class ObjectProjectsComponent implements OnInit {

    @Input() public objectId;
    public mockProject = project;
    public currentSlide = 0;
    public uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    public objects: IObjectSnippet[] = [];
    public snippets;
    public flats;

    constructor(
        public objectService: JkObjectsListService
    ) { }

    ngOnInit() {
        this.objectService.getSnippets()
            .subscribe((data) => {
                const tempObjects = data.filter(item => item._id !== this.objectId && item.publish);
                this.snippets = this.getRandomObjects(tempObjects);
                this.getFlatsMinPrice(this.snippets);
            });
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockProject.length - 4 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockProject.length - 1 ;
    }

    private getFlatsMinPrice(objects) {
        const last = objects.length;

        objects.forEach( (item, i) => {

            this.objectService.getFlats({mod: item.mod})
                .subscribe(
                    data => this.getMinPrice(item, (data.filter(flat => flat.type === 'КВ') ), i, last ),
                    error => console.log(error)
                );
        });
    }

    private getMinPrice(obj, flats, i, last) {
        let price = [];
        flats.forEach( el => price.push(el.price) );

        this.objects[i] = {
            status: obj.status,
            minPrice: price.length > 0 ? Number(Math.min(...price) / 1000000).toFixed(2) : obj.status === 'Готовые' ? 'Полностью распродан!' : false
        };
    }

    private getRandomObjects(tempObjects) {
        const jkMas = [];
        while (jkMas.length < 5) {
            const ind = this.getRandomInt(tempObjects.length - 1);
            if (!jkMas.find((item) => item._id === tempObjects[ind]._id)) {
                jkMas.push(tempObjects[ind]);
            }
        }
        return jkMas;
    }

   private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
