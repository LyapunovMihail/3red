import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PartnersAdminService } from './partners-admin.service';
import { IPartnersJk, IPartnersSnippet, PARTNERS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/partners/partners-api/partners.interfaces';
import { IPartnersTabsSnippet } from '../../../../serv-files/serv-modules/partners/tabs-api/partners-tabs.interfaces';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-partners-content-admin',
    templateUrl: './partners-admin.component.html',
    styleUrls: ['./partners-admin.component.scss']
})

export class PartnersAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();
    @Input()
    public tabSnippet: IPartnersTabsSnippet;

    public snippet: IPartnersSnippet;
    public jkArray: IObjectSnippet[];
    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = true;

    uploadsPath = `/${PARTNERS_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private partnersAdminService: PartnersAdminService
    ) { }

    ngOnInit() {
        this.getJk();
        this.partnersAdminService.getContentSnippetByTab(null)
            .subscribe(
                (data) => {
                    this.snippet = data;
                    if (this.snippet) {
                        this.setFormFromSnippet();
                    } else {
                        this.setNewForm();
                    }
                },
                (err) => console.error(err)
            );

    }

    private getJk() {
        this.partnersAdminService.getJkSnippets()
            .subscribe(
                (data) => this.jkArray = data,
                (err) => console.error(err)
            );
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            created_at: new Date(),
            last_modifyed: new Date(),
            blackPart: '',
            // greyPart: '',
            paragraf: '',
            uk: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            blackPart: this.snippet.blackPart,
            // greyPart: this.snippet.greyPart,
            paragraf: this.snippet.paragraf,
            uk: this.parseUkArray()
        });
    }

    private parseUkArray() {
        return this.formBuilder.array(this.snippet.uk.map((uk) => {
            return this.formBuilder.group({
                tab: uk.tab,
                title: uk.title,
                description: uk.description,
                url: uk.url,
                icon: uk.icon,
                jk: this.parseJkArray(uk.jk)
            });
        }));
    }

    private parseJkArray(jk: IPartnersJk[]) {
        return this.formBuilder.array(jk.map((item) => {
            return this.formBuilder.control({
                name: item.name,
                id: item.id
            });
        }));
    }

    public pushUk() {
        (this.form.get('uk') as FormArray).push(
            this.formBuilder.group({
                tab: this.tabSnippet.tab[0].name,
                title: '',
                description: '',
                url: '',
                icon: '',
                jk: this.formBuilder.array([])
            })
        );
    }

    public popUk(i) {
        (this.form.get('uk') as FormArray).removeAt(i);
    }

    public pushJk(i) {
        (this.form.get(['uk', i, 'jk']) as FormArray).push(
            this.formBuilder.control({
                name: this.jkArray[0].name,
                id: this.jkArray[0]._id
            })
        );
        console.log('this.form.value: ', this.form.value);
    }

    public popJk(i, j) {
        (this.form.get(['uk', i, 'jk']) as FormArray).removeAt(j);
    }

    public setJkValue(val, item) {
        const jk = this.jkArray.find((tempJk) => tempJk._id === val);
        item.setValue({ name: jk.name, id: jk._id });
        console.log('this.form.value: ', this.form.value);
    }

    imageUpload(e, i) {
        this.isLoad = true;
        this.imageUploadEvent = this.partnersAdminService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );
        console.log('event: ', e);
        this.partnersAdminService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляетс в текстовые (скрытые) инпуты формы
                (this.form.controls.uk as FormArray).at(i).get('icon').setValue(data.icon);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delIcon(i) {
        (this.form.controls.uk as FormArray).at(i).get('icon').setValue('');
    }

    public moveBlock(array, i, dir) {
        const arr = this.form.get('data').value;
        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    public save() {
        this.partnersAdminService.setContentSnippetData(this.form.value).subscribe(
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
