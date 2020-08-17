import { ObjectDocumentationAdminService } from './object-documentation-admin.service';
import { Uploader } from 'angular2-http-file-upload';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { IDocUploadItem, IObjectDocSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-objects-item-documentation-admin',
    templateUrl: './object-documentation-admin.component.html',
    styleUrls: ['./object-documentation-admin.component.scss'],
    providers: [
        ObjectDocumentationAdminService,
        Uploader
    ]
})
export class ObjectDocumentationAdminComponent implements OnInit {

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
    public dataMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

    constructor(
        private router: Router,
        public formBuilder: FormBuilder,
        public documentationService: ObjectDocumentationAdminService
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

        let chain = Promise.resolve();

        for (let j = 0; j < fileList.length; j++) {
            chain = chain
                .then(() => this.documentationService.fileUpload(fileList[j]))
                .then((data: IDocUploadItem[]) => {
                    if (j === fileList.length - 1) {
                        this.progressCount = 0;
                    }
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
    }

    public moveBlock(array, i, dir) {
        let arr = this.form.get('block').value;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
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

    public parseDate(date) {
        if (moment(date, 'DD.MM.YYYY').isValid()) {
            return date;
        } else {
            return moment(date).format('DD.MM.YYYY');
        }
    }
    public dateMask(val, elem) {
        console.log('dateMask: ->', val)
        if ( val.length > 2 && val.length < 4) {
            val = val + '.';
            elem = val;
        } else if ( val.length > 5 && val.length < 7) {
            val = val + '.';
            elem = val;
        } else if ( val.length > 10 ) {
            val = val.substr(0, 10);
            elem = val;
        }
    }
}
