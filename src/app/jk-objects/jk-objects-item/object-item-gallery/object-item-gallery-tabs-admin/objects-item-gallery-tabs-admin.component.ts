import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectsItemGalleryAdminService } from '../object-item-gallery-content-admin/objects-item-gallery-admin.service';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';

@Component({
    selector: 'app-objects-item-gallery-tabs-admin',
    templateUrl: './objects-item-gallery-tabs-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './objects-item-gallery-tabs-admin.component.scss']
})
export class ObjectsItemGalleryTabsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippet: IObjectTabsSnippet;

    public form: FormGroup;


    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private galleryService: ObjectsItemGalleryAdminService
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
            gallery: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        let galleryTabs;
        if (this.snippet.gallery.length) {
            galleryTabs = this.formBuilder.array(this.snippet.gallery.map((tab) => this.formBuilder.group({name: tab.name, show: tab.show})));
        } else {
            galleryTabs = this.formBuilder.array([]);
        }

        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            gallery: galleryTabs
        });
    }

    public pushTab() {
        (this.form.controls.gallery as FormArray).push(this.formBuilder.group( {name: ['', Validators.required], show: true}));
    }

    public popTab(i) {
        (this.form.controls.gallery as FormArray).removeAt(i);
    }

    public save() {
        this.galleryService.setTabsSnippetData(this.form.value).subscribe(
            (data) => {
                this.galleryService.removeTabSlidesFromGallery(data).subscribe(
                    () => {
                        this.snippetChange.emit(data);
                        this.closeModal.emit(true);
                    },
                    (err) => console.error(err)
                );
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
