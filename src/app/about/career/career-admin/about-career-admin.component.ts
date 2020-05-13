import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AboutCareerAdminService } from './about-career-admin.service';
import { ICareerSnippet } from '../../../../../serv-files/serv-modules/about/career-api/about-career.interfaces';

@Component({
    selector: 'app-about-career-admin',
    templateUrl: './about-career-admin.component.html',
    styleUrls: ['./about-career-admin.component.scss']
})

export class AboutCareerAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();
    @Input()
    public snippet: ICareerSnippet;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private careerService: AboutCareerAdminService
    ) { }

    ngOnInit() {
        console.log('this.snippet: ', this.snippet);

        if (this.snippet && this.snippet.data) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }

    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            switchOn: true,
            created_at: new Date(),
            last_modifyed: new Date(),
            data: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            data: this.parseDataArray()
        });
    }

    private parseDataArray() {
        return this.formBuilder.array(this.snippet.data.map((dataItem) => {
            return this.formBuilder.group({
                name: dataItem.name,
                text: dataItem.text,
                url: dataItem.url,
                show: dataItem.show
            });
        }));
    }

    public pushData() {
        (this.form.get('data') as FormArray).push(
            this.formBuilder.group({
                name: '',
                text: '',
                url: '',
                show: true
            })
        );
    }

    public popData(i) {
        (this.form.get('data') as FormArray).removeAt(i);
    }

    public moveBlock(array, i, dir) {
        let arr = this.form.get('data').value;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
        // console.log('ARR-MEMBERS!!! ->', arr);
        // console.log(array);
    }

    public save() {
        this.careerService.setSnippetData(this.form.value).subscribe(
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
