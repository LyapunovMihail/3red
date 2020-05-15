import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAdminService } from './service-admin.service';
import { IServiceJk, IServiceSnippet } from '../../../../serv-files/serv-modules/service/service-api/service.interfaces';
import { IServiceTabsSnippet } from '../../../../serv-files/serv-modules/service/tabs-api/service-tabs.interfaces';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-service-content-admin',
    templateUrl: './service-admin.component.html',
    styleUrls: ['./service-admin.component.scss']
})

export class ServiceAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();
    @Input()
    public tabSnippet: IServiceTabsSnippet;

    public snippet: IServiceSnippet;
    public jkArray: IObjectSnippet[];
    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private serviceAdminService: ServiceAdminService
    ) { }

    ngOnInit() {
        this.getJk();
        this.serviceAdminService.getContentSnippetByTab(null)
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
        this.serviceAdminService.getJkSnippets()
            .subscribe(
                (data) => this.jkArray = data,
                (err) => console.error(err)
            );
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            created_at: new Date(),
            last_modifyed: new Date(),
            blackPart: ['', Validators.required],
            greyPart: ['', Validators.required],
            uk: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            blackPart: this.snippet.blackPart,
            greyPart: this.snippet.greyPart,
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
                jk: this.parseJkArray(uk.jk)
            });
        }));
    }

    private parseJkArray(jk: IServiceJk[]) {
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
                title: ['', Validators.required],
                description: '',
                url: ['', Validators.required],
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
    }

    public popJk(i, j) {
        (this.form.get(['uk', i, 'jk']) as FormArray).removeAt(j);
    }

    public setJkValue(val, item) {
        const jk = this.jkArray.find((tempJk) => tempJk._id === val);
        item.setValue({ name: jk.name, id: jk._id });
    }

    public moveBlock(array, i, dir) {
        const arr = this.form.get('data').value;
        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    public save() {
        this.serviceAdminService.setContentSnippetData(this.form.value).subscribe(
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
