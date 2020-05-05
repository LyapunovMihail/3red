import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ObjectPreviewAdminService } from './object-preview-admin.service';
import { IObjectPreviewSnippet, OBJECTS_PREVIEW_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';
import { INDICATORS } from './indicators';

@Component({
    selector: 'app-objects-item-preview-admin',
    templateUrl: './object-preview-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-preview-admin.component.scss']
})
export class ObjectPreviewAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippet: IObjectPreviewSnippet;

    public form: FormGroup;
    public indicators: string[] = INDICATORS;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = false;
    public loadedImage = '';

    uploadsPath = `/${OBJECTS_PREVIEW_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private previewService: ObjectPreviewAdminService
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
            mainInfo: this.formBuilder.group({
                title: ['', Validators.required],
                address: ['', Validators.required],
                webcamLink: '',
                image : ['', Validators.required],
                thumbnail : ['', Validators.required]
            }),
            deadlines: this.formBuilder.array(
                []),
            indicators: this.formBuilder.array(
                this.indicators.map((item) => this.formBuilder.group({[item] : ''})))
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            mainInfo: this.formBuilder.group({
                title: [this.snippet.mainInfo.title, Validators.required],
                address: [this.snippet.mainInfo.address, Validators.required],
                webcamLink: this.snippet.mainInfo.webcamLink,
                image : [this.snippet.mainInfo.image, Validators.required],
                thumbnail : [this.snippet.mainInfo.thumbnail, Validators.required]
            }),
            deadlines: this.formBuilder.array(
                this.snippet.deadlines.map((item) => this.formBuilder.group({corpusId: item.corpusId, deadline: item.deadline, realized: item.realized}))),
            indicators: this.formBuilder.array(
                this.indicators.map((item) => {
                    const foundItem = this.snippet.indicators.find((indic) => indic.text === item);
                    return this.formBuilder.group({[item]: (foundItem ? foundItem.value : '')}); // ключи на русском языке
                }))
        });
        this.loadedImage = this.snippet.mainInfo.thumbnail;
    }

    public pushDeadlineSnippet() {
        (this.form.controls.deadlines as FormArray).push(this.formBuilder.group({corpusId: '', deadline: '', realized: false}));
    }
    public pushNewIndicator() {
        (this.form.controls.createdIndicators as FormArray).push(this.formBuilder.group({name: '', value: ''}));
    }

    public popDeadlineSnippet(i) {
        (this.form.controls.deadlines as FormArray).removeAt(i);
    }
    public deleteCreatedIndicators(i) {
        (this.form.controls.createdIndicators as FormArray).removeAt(i);
    }

    imageUpload(e) {
        this.isLoad = true;
        this.imageUploadEvent = this.previewService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.previewService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляется в превью
                this.loadedImage = data.thumbnail;
                // и в текстовые (скрытые) инпуты формы
                (this.form.controls.mainInfo as FormGroup).controls.image.setValue(data.image);
                (this.form.controls.mainInfo as FormGroup).controls.thumbnail.setValue(data.thumbnail);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delImg() {
        (this.form.controls.mainInfo as FormGroup).controls.image.setValue('');
        (this.form.controls.mainInfo as FormGroup).controls.thumbnail.setValue('');
        this.loadedImage = '';
    }

    public save() {
        this.previewService.convertIndicatorsValues(this.form);

        this.previewService.formSubmit(this.form.value).subscribe(
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
