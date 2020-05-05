import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ObjectProjectAdminService } from './object-project-admin.service';
import { IObjectProjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/project-api/objects-project.interfaces';
import { INDICATORS } from '../../object-preview/object-preview-admin/indicators';

@Component({
    selector: 'app-objects-item-project-admin',
    templateUrl: './object-project-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-project-admin.component.scss']
})
export class ObjectProjectAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippet: IObjectProjectSnippet;

    public form: FormGroup;
    public indicators: string[] = INDICATORS;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private projectService: ObjectProjectAdminService
    ) { }

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
            socials: this.formBuilder.group({
                vk: '',
                inst: '',
                fb: '',
            }),
            description: '',
            indicators: this.formBuilder.array(
                this.indicators.map((item) => this.formBuilder.group({[item] : ''}))),
            createdIndicators: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            switchOn: this.snippet.switchOn,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            socials: this.formBuilder.group({
                vk: this.snippet.socials.vk,
                inst: this.snippet.socials.inst,
                fb: this.snippet.socials.fb,
            }),
            description: this.snippet.description,
            indicators: this.formBuilder.array(
                this.indicators.map((item) => {
                    const foundItem = this.snippet.indicators.find((indic) => indic.text === item);
                    return this.formBuilder.group({[item]: (foundItem ? foundItem.value : '')}); // ключи на русском языке
                })),
            createdIndicators: this.formBuilder.array(
                this.snippet.createdIndicators ?
                    this.snippet.createdIndicators.map( item => this.formBuilder.group({ name: item.name, value: item.value }) ) : []
            )
        });
    }

    public pushNewIndicator() {
        (this.form.controls.createdIndicators as FormArray).push(this.formBuilder.group({name: '', value: ''}));
    }

    public deleteCreatedIndicators(i) {
        (this.form.controls.createdIndicators as FormArray).removeAt(i);
    }

    public save() {
        this.projectService.convertIndicatorsValues(this.form);

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
}
