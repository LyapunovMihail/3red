import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { ObjectLocationAdminService } from '../object-location-content-admin/object-location-admin.service';
import { OBJECTS_LOCATION_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';

@Component({
    selector: 'app-objects-item-location-tabs-admin',
    templateUrl: './object-location-tabs-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-location-tabs-admin.component.scss']
})

export class ObjectLocationTabsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();
    @Input()
    public objectName: string;
    @Input()
    public id: string;
    @Input()
    public snippet: IObjectTabsSnippet;

    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    uploadsPath = `/${OBJECTS_LOCATION_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private locationService: ObjectLocationAdminService
    ) { }

    ngOnInit() {
        if (this.snippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            objectId: this.id,
            created_at : new Date(),
            last_modifyed : new Date(),
            location: this.setPrimaryTabs()
        });
    }
    private setPrimaryTabs() {
        return this.formBuilder.array([
            this.formBuilder.group({
                name: 'Объект',
                coords: ['', Validators.required],
                image: ['', Validators.required],
                thumbnail: ['', Validators.required],
                show: false
            }),
            this.formBuilder.group({
                name: 'Офис продаж',
                coords: ['', Validators.required],
                image: ['', Validators.required],
                thumbnail: ['', Validators.required],
                show: false
            }),
            this.formBuilder.group({
                name: 'Инфраструктура',
                coords: ['', Validators.required],
                image: ['', Validators.required],
                thumbnail: ['', Validators.required],
                show: false
            })
        ]);
    }

    private setFormFromSnippet() {
        let locationTabs;
        if (this.snippet.location && this.snippet.location.length) {
            locationTabs = this.formBuilder.array(this.snippet.location.map((tab) => this.formBuilder.group(
                {name: tab.name, coords: tab.coords, image: tab.image, thumbnail: tab.thumbnail, show: tab.show }
                )
            ));
        } else {
            locationTabs = this.setPrimaryTabs();
        }

        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            location: locationTabs
        });
    }

    imageUpload(e, i) {
        this.imageUploadEvent = this.locationService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.locationService.imageUpload(e)
            .then( (data: any) => {
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляетс в текстовые (скрытые) инпуты формы
                (this.form.get('location') as FormArray).at(i).get('image').setValue(data.image);
                (this.form.get('location') as FormArray).at(i).get('thumbnail').setValue(data.thumbnail);
            })
            .catch((err) => {
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delImage(i) {
        (this.form.get('location') as FormArray).at(i).get('image').reset();
        (this.form.get('location') as FormArray).at(i).get('thumbnail').reset();
    }

    public save() {
        this.locationService.setTabsSnippetData(this.form.value).subscribe(
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
