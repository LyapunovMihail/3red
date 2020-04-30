import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IObjectDynamicSnippet, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { DynamicService } from './dynamic-admin-content.service';
import { MONTHARRAY } from '../../monthArray';

@Component({
    selector: 'app-dynamic-admin-content',
    templateUrl: 'dynamic-admin-content.component.html',
    styleUrls: ['../../../jk-objects-item.component.scss',
                'dynamic-admin-content.component.scss'],
    providers: [ WindowScrollLocker ]
})

export class DynamicAdminContentComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippet: IObjectDynamicSnippet;
    @Input()
    public year: number;
    @Input()
    public month: number;

    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = true;

    uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    public monthArray: string[] = MONTHARRAY;

    constructor(
        public formBuilder: FormBuilder,
        public dynamicService: DynamicService,
        public ref: ChangeDetectorRef
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
            year: this.year,
            month: this.month,
            created_at : new Date(),
            last_modifyed : new Date(),
            objects: this.formBuilder.array([])
        });
    }
    private setFormFromSnippet() {
        let dynamicObjects;
        if (this.snippet.objects && this.snippet.objects.length) {
            dynamicObjects = this.formBuilder.array(this.snippet.objects.map
                ((data) => this.formBuilder.group({ title: data.title, description: data.description, ready: data.ready, show: data.show, images: this.parseImagesArray(data.images) }))
            );
        } else {
            dynamicObjects = this.formBuilder.array([]);
        }

        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            year: this.snippet.year,
            month: this.snippet.month,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            objects: dynamicObjects
        });
    }
    private parseImagesArray(images) {
        return this.formBuilder.array(images.map((data) => {
                return this.formBuilder.control({
                    image: data.image,
                    thumbnail: data.thumbnail,
                    type: data.type
                });
            })
        );
    }

    public pushObject() {
        (this.form.get('objects') as FormArray).push(this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
            ready: [0, Validators.required],
            show:  [true, Validators.required],
            images: this.formBuilder.array([])
        }));
    }
    public popObject(i) {
        (this.form.get('objects') as FormArray).removeAt(i);
    }

    addImage(data, i) {
        (this.form.get(['objects', i, 'images']) as FormArray).push(this.formBuilder.control({image: data.image, thumbnail: data.thumbnail, type: 'IMAGE'}));
    }
    deleteImage(i, j) {
        (this.form.get(['objects', i, 'images']) as FormArray).removeAt(j);
    }

    imageUpload(e, i) {
        this.isLoad = true;
        this.imageUploadEvent = this.dynamicService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        const fileList: FileList = e.target.files;

        let chain = Promise.resolve();

        for (let j = 0; j < fileList.length; j++) {
            chain = chain
                .then(() => this.dynamicService.imageUpload(fileList[j]))
                .then((data: any) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();
                    this.addImage(data, i);
                })
                .catch((err) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();
                    alert('Что-то пошло не так!');
                    console.error(err);
                });
        }
    }

    public changeReady(i, value) {
        this.form.get(['objects', i, 'ready']).setValue(Number(value));
    }

    public removeChars(e) {
        const rep = /[-.;":'a-zA-Zа-яА-Я]/g;
        if (rep.test(e.target.value)) {
            e.target.value = (Number(e.target.value.replace(rep, '')));
        }
    }

    public save() {
        this.dynamicService.setContentSnippetData(this.form.value).subscribe(
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
