import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IHomePreviewSnippet } from '../../../../../serv-files/serv-modules/home/preview-api/home-preview.interfaces';
import { HomeInfoService } from '../home-info.service';

@Component({
    selector: 'app-home-info-admin',
    templateUrl: './home-info-admin.component.html',
    styleUrls: ['./home-info-admin.component.scss']
})

export class HomeInfoAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public snippet: IHomePreviewSnippet;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private homeInfoService: HomeInfoService
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
            title: '',
            text: ''
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            title: this.snippet.title,
            text: this.snippet.text
        });
    }

    public save() {
        this.homeInfoService.setSnippet(this.form.value).subscribe(
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
