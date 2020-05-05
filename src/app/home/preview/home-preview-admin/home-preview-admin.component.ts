import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePreviewService } from '../home-preview.service';
import { IHomePreviewSnippet } from '../../../../../serv-files/serv-modules/home/preview-api/home-preview.interfaces';

@Component({
    selector: 'app-home-preview-admin',
    templateUrl: './home-preview-admin.component.html',
    styleUrls: ['./home-preview-admin.component.scss']
})

export class HomePreviewAdminComponent implements OnInit {

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
        private homePreviewService: HomePreviewService
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
            text: '',
            showNews: false
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            title: this.snippet.title,
            text: this.snippet.text,
            showNews: this.snippet.showNews
        });
    }

    public save() {
        this.homePreviewService.setSnippet(this.form.value).subscribe(
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
