import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ObjectCreditAdminService } from './object-credit-admin.service';
import { banks } from '../mockBank';
import { IObjectCreditSnippet, OBJECTS_CREDIT_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';

@Component({
    selector: 'app-objects-item-credit-admin',
    templateUrl: './object-credit-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-credit-admin.component.scss']
})
export class ObjectCreditAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippet: IObjectCreditSnippet;

    public form: FormGroup;
    public banks = banks;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = false;
    public loadedImage = '';

    uploadsPath = `/${OBJECTS_CREDIT_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private projectService: ObjectCreditAdminService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            objectId: this.id,
            switchOn: true,
            created_at: new Date(),
            last_modifyed: new Date(),
            banks: (this.snippet && this.snippet.banks && this.snippet.banks.length) ? this.setBanksFromSnippet() : this.setNewBanks(),
        });

        console.log('this.form: ', this.form);
    }

    private setNewBanks() {
        return this.formBuilder.array(this.banks.map((item) => {
            return this.formBuilder.group({ name: item.name, cssClass: item.cssclass, image: item.image, percent: '', initial: '', deadline: '', show: false, isNew: item.isNew});
        }));
    }

    private setBanksFromSnippet() {
        return this.formBuilder.array(this.snippet.banks.map((item) => {
            return this.formBuilder.group({ name: item.name, cssClass: item.cssClass, image: item.image, percent: item.percent, initial: item.initial, deadline: item.deadline, show: item.show, isNew: item.isNew});
        }));
    }

    public deleteCreatedBank(index) {
        (this.form.controls.banks as FormArray).removeAt(index);
    }

    public pushNewBank() {
        (this.form.controls.banks as FormArray).push(
            this.formBuilder.group(
                {
                    name: '',
                    cssClass: '',
                    image: '',
                    percent: '',
                    initial: '',
                    deadline: '',
                    show: false,
                    isNew: true
                }
            )
        );
    }

    imageUpload(e,i) {
        this.isLoad = true;
        this.imageUploadEvent = this.projectService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.projectService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляется в превью
                this.loadedImage = data.image;
                // и в текстовые (скрытые) инпуты формы
                (this.form.controls.banks as FormArray).controls[i]['controls'].image.setValue(data.image);
                // (this.form.controls.banks as FormGroup).controls.thumbnail.setValue(data.thumbnail);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public save() {
        console.log(this.form.value);
        this.projectService.setSnippetData(this.form.value).subscribe(
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

    moveBank(array, i, dir) {
        let arr = this.form.value.banks;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }
}
