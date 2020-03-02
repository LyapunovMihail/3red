import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ObjectGalleryAdminService } from './object-gallery-admin.service';
import { IObjectGallerySnippet, OBJECTS_GALLERY_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';

@Component({
    selector: 'app-objects-item-gallery-content-admin',
    templateUrl: './object-gallery-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-gallery-admin.component.scss']
})
export class ObjectGalleryAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public tabSnippet: IObjectTabsSnippet;

    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = true;

    public snippet: IObjectGallerySnippet;

    uploadsPath = `/${OBJECTS_GALLERY_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private galleryService: ObjectGalleryAdminService
    ) { }

    ngOnInit() {
        this.galleryService.getContentSnippetByIdAndTab(this.id, null).subscribe(
            (data) => {
                this.snippet = data;
                if (this.snippet) {
                    this.setFormFromSnippet();
                } else {
                    this.setNewForm();
                }
                this.isLoad = false;
            },
            (err) => console.error(err)
        );
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            objectId: this.id,
            switchOn: true,
            created_at : new Date(),
            last_modifyed : new Date(),
            image_data: this.formBuilder.array(
                [])
        });
    }

    private setFormFromSnippet() {
        let imageData;
        if (this.snippet.image_data && this.snippet.image_data.length) {
            imageData = this.formBuilder.array(this.snippet.image_data.map((tab) => {
                if (!this.tabSnippet.gallery.length) {
                    tab.tab = 'no-tab';
                }
                return this.formBuilder.group({image: tab.image, thumbnail: tab.thumbnail, tab: tab.tab, title: tab.title, description: tab.description});
                }
            ));
        } else {
            imageData = this.formBuilder.array([]);
        }
        this.form = this.formBuilder.group({
            objectId: this.id,
            switchOn: this.snippet.switchOn,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            image_data: imageData
        });
    }

    public pushImageData() {
        (this.form.controls.image_data as FormArray).push(this.formBuilder.group({
            image: ['', Validators.required],
            thumbnail: ['', Validators.required],
            tab: this.tabSnippet.gallery.length ? this.tabSnippet.gallery[0].name : 'no-tab',
            title:  ['', Validators.required],
            description: ''
        }));
    }

    public popImageData(i) {
        (this.form.controls.image_data as FormArray).removeAt(i);
    }

    imageUpload(e, i) {
        this.isLoad = true;
        this.imageUploadEvent = this.galleryService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.galleryService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляетс в текстовые (скрытые) инпуты формы
                (this.form.controls.image_data as FormArray).at(i).get('image').setValue(data.image);
                (this.form.controls.image_data as FormArray).at(i).get('thumbnail').setValue(data.thumbnail);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delImg(i) {
        (this.form.controls.image_data as FormArray).at(i).get('image').setValue('');
        (this.form.controls.image_data as FormArray).at(i).get('thumbnail').setValue('');
    }

    public save() {
        this.galleryService.setContentSnippetData(this.form.value).subscribe(
            () => {
                this.snippetChange.emit();
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
