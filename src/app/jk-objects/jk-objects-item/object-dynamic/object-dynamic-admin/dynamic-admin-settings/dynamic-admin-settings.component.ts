import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DynamicService } from '../dynamic-admin-content/dynamic-admin-content.service';
import { IObjectTabsSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-admin-settings',
    templateUrl: 'dynamic-admin-settings.component.html',
    styleUrls: ['../../../jk-objects-item.component.scss',
                'dynamic-admin-settings.component.scss']
})

export class DynamicAdminSettingsComponent implements OnInit {

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
        public dynamicService: DynamicService
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
            dynamic: this.setPrimaryTabs()
        });
    }
    private setPrimaryTabs() {
        return this.formBuilder.array([
            this.formBuilder.group({
                name: ['Ход строительства', Validators.required],
                description: '',
                show: false
            }),
            this.formBuilder.group({
                name: ['Готовые дома', Validators.required],
                description: '',
                show: false
            })
        ]);
    }

    private setFormFromSnippet() {
        let dynamicTabs;
        if (this.snippet.dynamic && this.snippet.dynamic.length) {
            dynamicTabs = this.formBuilder.array(this.snippet.dynamic.map((tab) => this.formBuilder.group({name: tab.name, show: tab.show})));
        } else {
            dynamicTabs = this.setPrimaryTabs();
        }

        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            dynamic: dynamicTabs
        });
    }

    public save() {
        this.dynamicService.setTabsSnippetData(this.form.value).subscribe(
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
