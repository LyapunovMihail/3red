import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ObjectDecorationAdminService } from './object-decoration-admin.service';
import {
    IObjectDecorationSnippet,
    OBJECTS_DECORATION_UPLOADS_PATH
} from '../../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';

@Component({
    selector: 'app-objects-item-decoration-content-admin',
    templateUrl: './object-decoration-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-decoration-admin.component.scss']
})
export class ObjectDecorationAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public contentSnippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public contentSnippet: IObjectDecorationSnippet;

    public form: FormGroup = this.formBuilder.group({});

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = true;

    public showModal = false;

    uploadsPath = `/${OBJECTS_DECORATION_UPLOADS_PATH}`;

    public selectedIcon = '';
    public selectedInfo: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private decorationService: ObjectDecorationAdminService,
        public windowScrollLocker: WindowScrollLocker
    ) { }

    ngOnInit() {
        if (this.contentSnippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            objectId: this.id,
            switchOn: true,
            created_at : new Date(),
            last_modifyed : new Date(),
            data: this.setPrimaryDataTabs()
        });
    }
    private setFormFromSnippet() {
        let decorationData;
        if (this.contentSnippet.data && this.contentSnippet.data.length) {
            decorationData = this.formBuilder.array(this.contentSnippet.data.map((data) => this.formBuilder.group({images: this.parseImagesArray(data.images), info: this.parseInfosArray(data.info), tab:
                this.formBuilder.group({
                    name: data.tab.name,
                    show: data.tab.show,
                    turnOnDecorationTypes: data.tab.turnOnDecorationTypes,
                    decorationType: data.tab.decorationType
                })})));
        } else {
            decorationData = this.setPrimaryDataTabs();
        }

        this.form = this.formBuilder.group({
            objectId: this.contentSnippet.objectId,
            switchOn: this.contentSnippet.switchOn,
            created_at : this.contentSnippet.created_at,
            last_modifyed : new Date(),
            data: decorationData
        });
        console.log('this.contentSnippet: ', this.contentSnippet);
        console.log('form: ', this.form);
    }
    private parseImagesArray(images) {
        console.log('images: ', images);
        return this.formBuilder.array(images.map((data) => {
                return this.formBuilder.group({
                    image: data.image,
                    thumbnail: data.thumbnail
                });
            })
        );
    }
    private parseInfosArray(info) {
        return this.formBuilder.array(info.map((data) => {
                return this.formBuilder.group({
                    name: data.name,
                    mod: data.mod
                });
            })
        );
    }
    private setPrimaryDataTabs() {
        return this.formBuilder.array([
            this.formBuilder.group({
                images: this.formBuilder.array([]),
                info: this.formBuilder.array([]),
                tab: this.formBuilder.group({name: 'Жилая комната', show: true, turnOnDecorationTypes: false})
            }),
            this.formBuilder.group({
                images: this.formBuilder.array([]),
                info: this.formBuilder.array([]),
                tab: this.formBuilder.group({name: 'Кухня', show: true, turnOnDecorationTypes: false})
            }),
            this.formBuilder.group({
                images: this.formBuilder.array([]),
                info: this.formBuilder.array([]),
                tab: this.formBuilder.group({name: 'Санузел', show: true, turnOnDecorationTypes: false})
            }),
            this.formBuilder.group({
                images: this.formBuilder.array([]),
                info: this.formBuilder.array([]),
                tab: this.formBuilder.group({name: 'Прихожая', show: true, turnOnDecorationTypes: false})
            }),
            this.formBuilder.group({
                images: this.formBuilder.array([]),
                info: this.formBuilder.array([]),
                tab: this.formBuilder.group({name: 'Общедомовые пространства', show: true, turnOnDecorationTypes: false})
            })
        ]);
    }

    deleteImage(i, j) {
        (this.form.get(['data', i, 'images']) as FormArray).removeAt(j);
    }

    addGallerySlide(data, i) {
        (this.form.get(['data', i, 'images']) as FormArray).push(this.formBuilder.group({image: data.image, thumbnail: data.thumbnail}));
    }

    imageUpload(e, i) {
        this.isLoad = true;
        this.imageUploadEvent = this.decorationService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.decorationService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                this.addGallerySlide(data, i);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    addInfo(i) {
        (this.form.get(['data', i, 'info']) as FormArray).push(this.formBuilder.group({name: '', mod: ''}));
    }

    setInfoIcon() {
        this.selectedInfo.get('mod').setValue(this.selectedIcon);
        console.log('this.form: ', this.form);
    }
    delInfoIcon() {
        this.selectedInfo.get('mod').setValue('');
    }

    showModalIcon(info) {
        this.showModal = true;
        this.selectedInfo = info;
    }

    public save() {
        console.log('this.form.value: ', this.form.value);
        this.decorationService.setContentSnippetData(this.form.value).subscribe(
            (content) => {
                this.contentSnippetChange.emit(content);
                this.closeModal.emit(true);
            },
            (err) => console.error(err)
        );
    }

    public close(isSave) {
        if (isSave) {
            this.save();
        } else {
            this.closeModal.emit(true);
        }
    }
}
