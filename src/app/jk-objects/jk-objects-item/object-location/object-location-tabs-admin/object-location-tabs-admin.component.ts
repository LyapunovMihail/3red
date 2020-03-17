import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { ObjectLocationAdminService } from '../object-location-content-admin/object-location-admin.service';
import { IObjectDecorationSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';

@Component({
    selector: 'app-objects-item-decoration-tabs-admin',
    templateUrl: './object-decoration-tabs-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
                './object-decoration-tabs-admin.component.scss']
})
export class ObjectLocationTabsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public contentSnippetChange = new EventEmitter();
    @Output()
    public typesSnippetChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public typesSnippet: IObjectTabsSnippet;
    @Input()
    public contentSnippet: IObjectDecorationSnippet;

    public showHint = false;
    public form: FormGroup;
    public typesForm: FormGroup;
    public prevTypes: string[];

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private decorationService: ObjectLocationAdminService
    ) { }

    ngOnInit() {
        if (this.contentSnippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
        if (this.typesSnippet) {
            this.setTypesFormFromSnippet();
        } else {
            this.setNewTypesForm();
        }
        this.prevTypes = this.typesSnippet.decorationType;
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
    }
    private parseImagesArray(images) {
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

    public pushTab() {
        (this.form.get('data') as FormArray).push(this.formBuilder.group( {
            images: this.formBuilder.array([]), info: this.formBuilder.array([]), tab: this.formBuilder.group({name: '', show: true, turnOnDecorationTypes: false})
        }));
    }

    public popTab(i) {
        (this.form.get('data') as FormArray).removeAt(i);
    }

    private setNewTypesForm() {

        this.typesForm = this.formBuilder.group({
            objectId: this.id,
            created_at : new Date(),
            last_modifyed : new Date(),
            decorationType: this.formBuilder.array([])
        });
    }

    private setTypesFormFromSnippet() {
        let decorationTypes;
        if (this.typesSnippet.decorationType && this.typesSnippet.decorationType.length) {
            decorationTypes = this.formBuilder.array(this.typesSnippet.decorationType);
        } else {
            decorationTypes = this.formBuilder.array([]);
        }

        this.typesForm = this.formBuilder.group({
            objectId: this.typesSnippet.objectId,
            created_at : this.typesSnippet.created_at,
            last_modifyed : new Date(),
            decorationType: decorationTypes
        });
    }

    public pushType() {
        (this.typesForm.get('decorationType') as FormArray).push(new FormControl('', Validators.required));
        this.prevTypes.push('');
    }

    public popType(i) {
        (this.typesForm.get('decorationType') as FormArray).removeAt(i);
        this.prevTypes.splice(i, 1);
    }

    public getTabIndex(i) {
        return (this.form.get('data') as FormArray).getRawValue().reduce((trueInd, item, index) => {
            if (index > i) {
                return trueInd;
            }
            if (!item.tab.decorationType) {
                return trueInd + 1;
            } else {
                return trueInd;
            }
        }, 0);
    }

    public changeType(e, i) {
        this.prevTypes[i] = e.target.value; // Сохраняем типы отделки в отдельный массив чтобы потом изменить в контенте табы со старыми названиями типов отделки
    }

    public save() {
        const formValue = this.decorationService.setTabsWithTypes(this.form.value, this.typesForm.value, this.prevTypes);

        this.decorationService.setTypesSnippetData(this.typesForm.value).subscribe(
            (types) => {
                this.typesSnippetChange.emit(types);
                this.decorationService.setContentSnippetData(formValue).subscribe(
                    (content) => {
                        this.contentSnippetChange.emit(content);
                        this.closeModal.emit(true);
                    },
                    (err) => console.error(err)
                );
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
