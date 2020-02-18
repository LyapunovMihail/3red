import { ObjectItemDocumentationAdminService } from './object-item-documentation-admin.service';
import { FILEUPLOADS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/fileuploads-api/fileuploads.interfaces';
import { Uploader } from 'angular2-http-file-upload';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { IDocUploadItem, IObjectDocSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-objects-item-documentation-admin',
    templateUrl: './object-item-documentation-admin.component.html',
    styleUrls: ['./object-item-documentation-admin.component.scss'],
    providers: [
        ObjectItemDocumentationAdminService,
        Uploader
    ]
})
export class ObjectItemDocumentationAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    snippet: IObjectDocSnippet;

    public form: FormGroup;

    public progressEvent;
    public progressCount: number;
    public progressCurrent: number;
    public progressLoaded = false;

    constructor(
        private router: Router,
        public formBuilder: FormBuilder,
        public documentationService: ObjectItemDocumentationAdminService
    ) {}

    ngOnInit() {
        if (this.snippet && this.snippet.created_at) {
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
            block: this.formBuilder.array([]),
        });
    }

    private setFormFromSnippet() {
        let block;
        if (this.snippet.block.length) {
            block = this.parseBlockArray();
        } else {
            block = this.formBuilder.array([]);
        }

        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            switchOn: this.snippet.switchOn,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            block
        });
    }

    private parseBlockArray() {
        return this.formBuilder.array(this.snippet.block.map((blockItem) => this.formBuilder.group({blockTitle: [blockItem.blockTitle, Validators.required], uploads : this.parseUploadsArray(blockItem.uploads)})));
    }
    private parseUploadsArray(uploadsArray) {
        return this.formBuilder.array(uploadsArray.map((uploadsItem) => this.formBuilder.group({name: uploadsItem.name, originalName: uploadsItem.originalName, ext: uploadsItem.ext, date: uploadsItem.date})));
    }

    public pushBlock() {
        (this.form.get('block') as FormArray).push(this.formBuilder.group( {blockTitle: ['', Validators.required], uploads : this.formBuilder.array([])}));
    }

    public popBlock(i) {
        (this.form.get('block') as FormArray).removeAt(i);
    }

    pushDoc(data, i) {
        (this.form.get(['block', i, 'uploads']) as FormArray).push(this.formBuilder.group({name: data.name, originalName: data.originalName, date: data.date}));
    }

    popDoc(i, j) {
        (this.form.get(['block', i, 'uploads']) as FormArray).removeAt(j);
    }

    public fileUpload(e, i) {
        const fileList: FileList = e.target.files;
        this.progressCount = fileList.length;
        this.progressLoaded = true;
        this.progressEvent = this.documentationService.getCurrentLoadedFile().subscribe((val) => {
            this.progressCurrent = val + 1;
        });
        this.documentationService.fileUpload(fileList)
            .then((data: IDocUploadItem[]) => {
                this.progressCount = 0;
                this.progressLoaded = false;
                this.progressEvent.unsubscribe();
                this.pushDoc(data, i);
            })
            .catch((err) => {
                console.error(err);
                this.progressEvent.unsubscribe();
                alert('Что-то пошло не так!');
            });
    }

    moveUp(question, array) {
        // для кнопки вверх, но не получилось задать массив
        // console.log(this.form .get(['block', index,  'questions']) as FormArray);

        const index = array.indexOf(question);
        array.splice(index, 1);
        array.splice(index + 1, 0, question);
        return array;

    }

    public save() {
        this.documentationService.setSnippetData(this.form.value).subscribe(
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
