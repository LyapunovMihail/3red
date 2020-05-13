import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AboutTeamAdminService } from './about-team-admin.service';
import { ABOUT_TEAM_UPLOADS_PATH, ITeamSnippet } from '../../../../../serv-files/serv-modules/about/team-api/about-team.interfaces';

@Component({
    selector: 'app-about-team-content-admin',
    templateUrl: './about-team-admin.component.html',
    styleUrls: ['./about-team-admin.component.scss']
})
export class AboutTeamAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public tabName: string;
    @Input()
    public snippet: ITeamSnippet;

    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = true;

    uploadsPath = `/${ABOUT_TEAM_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private teamService: AboutTeamAdminService
    ) { }

    ngOnInit() {
        console.log('this.snippet: ', this.snippet);
        if (this.snippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
        this.isLoad = false;
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            created_at : new Date(),
            last_modifyed : new Date(),
            tab: this.tabName,
            data: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        let data;
        if (this.snippet.data && this.snippet.data.length) {
            data = this.formBuilder.array(this.snippet.data.map((item) => {
                return this.formBuilder.group({image: item.image, thumbnail: item.thumbnail, fio: item.fio, position: item.position});
                }
            ));
        } else {
            data = this.formBuilder.array([]);
        }
        this.form = this.formBuilder.group({
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            tab: this.snippet.tab,
            data
        });
    }

    public pushData() {
        (this.form.controls.data as FormArray).push(this.formBuilder.group({
            image: ['', Validators.required],
            thumbnail: ['', Validators.required],
            fio:  ['', Validators.required],
            position: ['', Validators.required]
        }));
    }

    public popData(i) {
        (this.form.controls.data as FormArray).removeAt(i);
    }

    imageUpload(e, i) {
        this.isLoad = true;
        this.imageUploadEvent = this.teamService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.teamService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляетс в текстовые (скрытые) инпуты формы
                (this.form.controls.data as FormArray).at(i).get('image').setValue(data.image);
                (this.form.controls.data as FormArray).at(i).get('thumbnail').setValue(data.thumbnail);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delImg(i) {
        (this.form.controls.data as FormArray).at(i).get('image').setValue('');
        (this.form.controls.data as FormArray).at(i).get('thumbnail').setValue('');
    }

    public save() {
        this.teamService.setContentSnippetData(this.form.value).subscribe(
            () => {
                this.snippetChange.emit();
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
