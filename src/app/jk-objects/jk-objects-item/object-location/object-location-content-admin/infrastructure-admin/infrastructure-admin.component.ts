import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IInfraMarks } from '../../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { navList } from '../../location-infrastructure/config';

@Component({
    selector: 'app-infrastructure-routes-admin',
    templateUrl: './infrastructure-admin.component.html',
    styleUrls: ['./infrastructure-admin.component.scss']
})
export class InfrastructureAdminComponent implements OnInit {

    @Output()
    public infraMarksChange = new EventEmitter();
    @Input()
    public infraMarks: IInfraMarks[];

    public form: FormGroup;
    public formArray: FormArray;

    public navList = navList;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        if (this.infraMarks.length) {
            this.setInfraMarksFromSnippet();
        } else {
            this.formArray = this.formBuilder.array([]);
        }
        this.form = this.formBuilder.group({
            infraMarks: this.formArray
        });

        this.form.valueChanges.subscribe((value) => {
            this.infraMarksChange.emit(value.infraMarks);
        });
    }

    private setInfraMarksFromSnippet() {
        this.formArray = this.formBuilder.array(this.infraMarks.map((item) => {
            return this.formBuilder.group({
                type: item.type,
                coords: item.coords,
                name: item.name
            });
        }));
    }

    public pushMark() {
        this.formArray.push(this.formBuilder.group({
            type: this.navList[0].type,
            coords: '',
            name: ''
        }));
    }

    public popMark(i) {
        this.formArray.removeAt(i);
    }
}
