import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import {
    IInfraMarks,
    IObjectLocationSnippet,
    IRoutesMarks,
    OBJECTS_LOCATION_UPLOADS_PATH
} from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { ObjectLocationAdminService } from './object-location-admin.service';

@Component({
    selector: 'app-objects-item-location-content-admin',
    templateUrl: './object-location-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-location-admin.component.scss']
})

export class ObjectLocationAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public tabSnippet: IObjectTabsSnippet;
    @Input()
    public contentSnippet: IObjectLocationSnippet;

    public form: FormGroup;
    public routesMarks: IRoutesMarks[] = [];
    public infraMarks: IInfraMarks[] = [];
    public show = '';

    uploadsPath = `/${OBJECTS_LOCATION_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private locationService: ObjectLocationAdminService
    ) { }

    ngOnInit() {
        if (!this.contentSnippet.data) {
            this.setSnippet();
        }
        this.show = 'routes';
    }

    private setSnippet() {
        this.contentSnippet = {
            objectId: this.id,
            switchOn: true,
            created_at: new Date(),
            last_modifyed: new Date(),
            data: this.tabSnippet.location.map((item) => {
                if (item.name === 'Объект' || item.name === 'Офис продаж') {
                    return {tab: item, routesMarks: []};
                } else if (item.name === 'Инфраструктура') {
                    return {tab: item, infraMarks: []};
                }
            })
        };
    }

    private setReference() {
        this.contentSnippet.data[1].routesMarks = this.contentSnippet.data[0].routesMarks;

    }
    public save() {
        this.locationService.parseFormValue(this.contentSnippet.data[0].routesMarks);
        this.setReference();
        this.locationService.setContentSnippetData(this.contentSnippet).subscribe(
            (data) => {
                this.snippetChange.emit(data);
                this.closeModal.emit(true);
            },
            (err) => {
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public close(isSave) {
        if (isSave) {
            this.save();
        } else {
            this.closeModal.emit(true);
        }
    }
}
