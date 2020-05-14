import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceAdminService } from '../service-content-admin/service-admin.service';
import { IServiceTabsSnippet } from '../../../../serv-files/serv-modules/service/tabs-api/service-tabs.interfaces';

@Component({
    selector: 'app-service-tabs-admin',
    templateUrl: './service-tabs-admin.component.html',
    styleUrls: ['./service-tabs-admin.component.scss']
})
export class ServiceTabsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public snippet: IServiceTabsSnippet;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private serviceAdminService: ServiceAdminService
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
            created_at : new Date(),
            last_modifyed : new Date(),
            tab: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        let tabs;
        if (this.snippet.tab && this.snippet.tab.length) {
            tabs = this.formBuilder.array(this.snippet.tab.map((tab) => this.formBuilder.group({name: tab.name, show: tab.show})));
        } else {
            tabs = this.formBuilder.array([]);
        }

        this.form = this.formBuilder.group({
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            tab: tabs
        });
    }

    public pushTab() {
        (this.form.controls.tab as FormArray).push(this.formBuilder.group( {name: ['', Validators.required], show: true}));
    }

    public popTab(i) {
        (this.form.controls.tab as FormArray).removeAt(i);
    }

    public moveBlock(array, i, dir) {
        const arr = this.form.get('tab').value;
        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    public save() {
        this.serviceAdminService.setTabsSnippetData(this.form.value).subscribe(
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
