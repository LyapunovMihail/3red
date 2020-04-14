import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IObjectSnippet, OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { JkObjectsListService } from '../jk-objects-list.service';

@Component({
    selector: 'app-objects-admin',
    templateUrl: './objects-admin.component.html',
    styleUrls: ['./objects-admin.component.scss']
})

export class ObjectsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetsChange = new EventEmitter();

    @Input()
    public id: string;
    @Input()
    public snippets: IObjectSnippet[];

    public snippet: IObjectSnippet;

    public form: FormGroup;

    public imageUploadEvent;
    public imageUploadPercent: number;
    uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private objectService: JkObjectsListService
    ) { }

    ngOnInit() {
        this.snippet = this.snippets.find((item) => item._id === this.id);
        if (this.snippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            mod: ['', Validators.required],
            name: ['', Validators.required],
            subtext: ['', Validators.required],
            address: ['', Validators.required],
            district: ['', Validators.required],
            coords: ['', Validators.required],
            show_on_main: [false, Validators.required],
            publish: [false, Validators.required],
            status: ['В проекте', Validators.required],
            image:  ['', Validators.required],
            thumbnail:  ['', Validators.required],
            created_at: new Date(),
            last_modifyed: new Date()
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            mod: [this.snippet.mod, Validators.required],
            name: [this.snippet.name, Validators.required],
            subtext: [this.snippet.subtext, Validators.required],
            address: [this.snippet.address, Validators.required],
            district: [this.snippet.district, Validators.required],
            coords: [this.snippet.coords, Validators.required],
            show_on_main: [this.snippet.show_on_main, Validators.required],
            publish: [this.snippet.publish, Validators.required],
            status: [this.snippet.status, Validators.required],
            image: [this.snippet.image, Validators.required],
            thumbnail: [this.snippet.thumbnail, Validators.required],
            created_at: new Date(),
            last_modifyed: new Date()
        });
    }

    imageUpload(e) {
        this.imageUploadEvent = this.objectService.getPercentLoadedImage().subscribe(
            (val) => {
                this.imageUploadPercent = val;
                this.ref.detectChanges();
            },
            (err) => {
                this.imageUploadEvent.unsubscribe();
            }
        );

        this.objectService.imageUpload(e)
            .then( (data: any) => {
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляетс в текстовые (скрытые) инпуты формы
                this.form.get('image').setValue(data.image);
                this.form.get('thumbnail').setValue(data.thumbnail);
            })
            .catch((err) => {
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public delImage() {
        this.form.get('image').reset();
        this.form.get('thumbnail').reset();
    }

    public save() {

        if (!this.id) {
            this.objectService.setSnippet(this.form.value).subscribe(
                // а в общий компонент передается новый массив сниппетов
                (data) => { this.snippetsChange.emit(data); this.closeModal.emit(true); },
                (err) => {
                    alert('Что-то пошло не так!');
                    console.error(err);
                }
            );
        } else {
            this.objectService.updateSnippet(this.id, this.form.value).subscribe(
                // а в общий компонент передается новый массив сниппетов
                (data) => { this.snippetsChange.emit(data); this.closeModal.emit(true); },
                (err) => {
                    alert('Что-то пошло не так!');
                    console.error(err);
                }
            );
        }
    }

    public close(isSave) {
        if (isSave) {
            this.save();
        } else {
            this.closeModal.emit(true);
        }
    }
}
