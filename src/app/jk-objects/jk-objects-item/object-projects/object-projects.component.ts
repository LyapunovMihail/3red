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

    public snippets;
    public flats;

    constructor(
        public objectService: JkObjectsListService
    ) { }

    ngOnInit() {
        this.objectService.getSnippets()
            .subscribe((data) => {
                const tempObjects = data.filter(item => item._id !== this.objectId && item.publish);
                this.snippets = tempObjects.length && tempObjects.length > 5 ? this.getRandomObjects(tempObjects) : tempObjects;
                this.filterSnippets();
                this.getFlatsMinPrice();
            });
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockProject.length - 4 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockProject.length - 1 ;
    }

    public filterSnippets() {
        const filteredSnippets: IObjectSnippet[] = [];
        if (this.snippets && this.snippets.length > 0) {
            this.snippets.forEach((item) => {
                if (item.publish) {
                    filteredSnippets.push(item);
                }
            });
        }
        this.snippets = filteredSnippets;
    }

    private getFlatsMinPrice() {
        this.objectService.getFlats({type: '????,????', status: '4'})
            .subscribe(
                data => this.getMinPrice(this.snippets, data),
                error => console.log(error)
            );
    }

    private getMinPrice(jkList, flats) {
        jkList.forEach( jk => {
            if (jk.subtext) { return; }
            const price = flats.filter(flat => flat.mod === jk.mod).map(flat => flat.price);
            if (!price.length) { return; }
            const minPrice = ( Math.min(...price) / 1000000 ).toFixed(2);
            jk.subtext = `???????????????? ???? ${minPrice} ??????. ??????.`;
        });
    }

    private getRandomObjects(tempObjects) {
        const jkMas = [];
        if (tempObjects.length) {
            while (jkMas.length < 5) {
                const ind = this.getRandomInt(tempObjects.length - 1);
                if (!jkMas.find((item) => item._id === tempObjects[ind]._id)) {
                    jkMas.push(tempObjects[ind]);
                }
            }
        }

        return jkMas;
    }

   private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
