import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { NewsCreateRedactFormService } from './news-create-redact-form.service';
import { Uploader } from 'angular2-http-file-upload';
import { INewsSnippet, NEWS_UPLOADS_PATH, NewsBodyBlock } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-news-create-redact-form',
    templateUrl: './news-create-redact-form.component.html',
    styleUrls: ['./../news-form.component.scss'],
    providers: [
        Uploader,
        NewsCreateRedactFormService
    ]
})

/*
    При открытии формы ее значения сбрасываются, устанавливаются дефолтные значения : created_at, last_modifyed, icon_mod.

    Кнопка "Добавить" будет иметь атрибут disable, до тех пор пока не заполнены обязательные поля :
    category, title, show_on_main, image, thumbnail.

    Поля image, thumbnail - текстового типа. Они скрыты. Заполняются при добавлении изображения,
    которое тут же отправляется на сервер, а пришедший ответ записывается в эти скрытые инпуты.

    Блок с иконками для отображения на главной странице по умолчанию скрыт, и появляется
    при выборе поля "показывать на главной странице".

*/

export class NewsCreateRedactFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() isForm = false;
    @Input() objectId = '';
    @Input() objectName = '';
    @Input() snippetsArray: INewsSnippet[] = [];
    @Input() redactId: any;
    // вызывается при создании сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() snippetsChange = new EventEmitter();

    @Output() close = new EventEmitter();

    snippet: INewsSnippet;

    // путь для загрузки изображений
    uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    // инициализация формы
    form: FormGroup;

    // подписка на авторизацию
    isAuthorizated = false;
    AuthorizationEvent;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = false;

    public dateNow: string;

    public showModal = false;
    public modalAnchorData;

    public modsBtnList: IObjectSnippet | any;

    constructor(
        private formBuilder: FormBuilder,
        private authorization: AuthorizationObserverService,
        private newsCreateService: NewsCreateRedactFormService,
        public ref: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe((val) => {
            this.isAuthorizated = val;
        });

        this.getModBtns();

        moment.locale('ru');
        this.dateNow = moment(Date.now()).format('LL').slice(0, -3);

        this.setNewForm();
    }

    public setNewForm() {
        this.form = this.formBuilder.group({
            created_at: '',
            last_modifyed: '',
            title: ['', Validators.compose([Validators.required])],
            description: '',
            show_on_main: false,
            publish: false,
            image: ['', Validators.required],
            thumbnail: ['', Validators.required],
            objectId: this.objectId,
            objectName: this.objectName,
            shareCount: {vk: 0, fb: 0, ok: 0},
            body: this.formBuilder.array([])
        });
    }

    public setFormFromSnippet() {
        this.form = this.formBuilder.group({
            created_at: this.snippet.created_at,
            last_modifyed: this.snippet.last_modifyed,
            title: [this.snippet.title, Validators.compose([Validators.required])],
            description: this.snippet.description,
            show_on_main: this.snippet.show_on_main,
            publish: this.snippet.publish,
            image: [this.snippet.image, Validators.required],
            thumbnail: [this.snippet.thumbnail, Validators.required],
            objectId: this.snippet.objectId,
            objectName: this.snippet.objectName,
            shareCount: this.snippet.shareCount,
            body: this.formBuilder.array([])
        });
    }

    public getModBtns() {
        this.newsCreateService.getSnippets()
            .subscribe(
                (data) => {
                    this.modsBtnList = data;
                    this.modsBtnList.unshift({name: '', mod: '', _id: ''});
                },
                (err) => console.error(err)
            );
    }

    public changeMod(e) {
        const selectedValue = this.modsBtnList[e.target.selectedIndex];
        this.form.get('objectId').setValue(selectedValue._id);
        this.form.get('objectName').setValue(selectedValue.name);
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    showModalFunc(obj, i) {
        this.showModal = true;
        obj.formControl = this.body.at(i);
        this.modalAnchorData = obj;
    }

    public get body(): FormArray {
        return this.form.get('body') as FormArray;
    }

    public addDescription(order?: number, value?: string) {
        this.body.push(new FormControl({
            blockType: 'description',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockDescription: value ? value : ''
        }));
    }

    public addTitle(order?: number, value?: string) {
        this.body.push(new FormControl({
            blockType: 'title',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockTitle: value ? value : ''
        }));
    }

    public addImage(order?: number, obj?: object) {
        this.body.push(new FormControl({
            blockType: 'image',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockImg: obj ? obj : {
                image: '',
                thumbnail: ''
            }
        }));
    }

    public addImage2(order?: number, obj?: object) {
        this.body.push(new FormControl({
            blockType: 'image2',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockImg2: obj ? obj : {
                image: '',
                thumbnail: '',
                image2: '',
                thumbnail2: ''
            }
        }));
    }

    public changeBlockImage(data, i) {
        this.body.at(i).setValue({
            blockType: 'image',
            blockOrderNumber: this.body.at(i).value.blockOrderNumber,
            blockImg: {
                image: data.image,
                thumbnail: data.thumbnail
            }
        });
    }

    public changeBlockImage2(data, i, isFirst) {
        if (isFirst) {
            this.body.at(i).setValue({
                blockType: 'image2',
                blockOrderNumber: this.body.at(i).value.blockOrderNumber,
                blockImg2: {
                    image: data.image,
                    thumbnail: data.thumbnail,
                    image2: this.body.at(i).value.blockImg2.image2 ? this.body.at(i).value.blockImg2.image2 : '',
                    thumbnail2: this.body.at(i).value.blockImg2.thumbnail2 ? this.body.at(i).value.blockImg2.thumbnail2 : ''
                }
            });
        } else {
            this.body.at(i).setValue({
                blockType: 'image2',
                blockOrderNumber: this.body.at(i).value.blockOrderNumber,
                blockImg2: {
                    image: this.body.at(i).value.blockImg2.image ? this.body.at(i).value.blockImg2.image : '',
                    thumbnail: this.body.at(i).value.blockImg2.thumbnail ? this.body.at(i).value.blockImg2.thumbnail : '',
                    image2: data.image,
                    thumbnail2: data.thumbnail
                }
            });
        }
    }

    public removeBlock(cnt) {
        if (confirm('Удалить секцию?')) {
            this.body.removeAt(cnt);
        }
    }

    public moveBlock(array, i, dir) {
        const arr = this.form.value.body;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    ngOnChanges(changes: SimpleChanges) {
        // при открытии формы
        console.log('this.redactId: ', this.redactId);
        if (this.isForm) {
            // при открытии формы расставляются значения редактируемого сниппета
            this.snippet = this.snippetsArray.find((item) => item._id === this.redactId);
            if (this.snippet) {
                this.setFormFromSnippet();
                this.form.get('last_modifyed').setValue(new Date().toISOString());
                if (this.snippet.body.length) {
                    (this.snippet.body as NewsBodyBlock[]).forEach((body: NewsBodyBlock) => {
                        if (body.blockType === 'title') {
                            this.addTitle(body.blockOrderNumber, body.blockTitle);
                        } else if (body.blockType === 'image') {
                            this.addImage(body.blockOrderNumber, body.blockImg);
                        } else if (body.blockType === 'image2') {
                            this.addImage2(body.blockOrderNumber, body.blockImg2);
                        } else if (body.blockType === 'description') {
                            this.addDescription(body.blockOrderNumber, body.blockDescription);
                        }
                    });
                }
            } else {
                // сбрасываются значения
                this.setNewForm();
                const date = new Date();
                // дата создания и последнего редактирования равны
                this.form.controls.created_at.setValue(date);
                this.form.controls.last_modifyed.setValue(date);
                this.form.controls.objectId.setValue(this.objectId);
                this.form.controls.objectName.setValue(this.objectName);
            }
        }
    }

    // добавление картинок в форму
    imageUpload(e: Event, type: string, i?: number, isFirst?: number) {
        if (this.isAuthorizated) {
            this.isLoad = true;
            this.imageUploadEvent = this.newsCreateService.getPercentLoadedImage().subscribe(
                (val) => {
                    this.imageUploadPercent = val;
                    this.ref.detectChanges();
                },
                (err) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();
                }
            );

            this.newsCreateService.imageUpload(e)
                .then((data: any) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();

                    if (type === 'main-image') {
                        this.form.patchValue({image: data.image});
                        this.form.patchValue({thumbnail: data.thumbnail});
                    } else if (type === 'single-image') {
                        this.addImage(this.body.controls.length, {
                            image: data.image,
                            thumbnail: data.thumbnail
                        });
                    } else if (type === 'change-image' && i !== undefined) {
                        this.changeBlockImage(data, i);
                    } else if (type === 'change-image2') {
                        this.changeBlockImage2(data, i, isFirst);

                    }
                })
                .catch((err) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();
                    alert('Что-то пошло не так!');
                    console.error(err);
                });
        }
    }

    deleteImage() {
        this.form.patchValue({image: ''});
        this.form.patchValue({thumbnail: ''});
    }

    get publish(): FormControl {
        return this.form.get('publish') as FormControl;
    }

    get showOnMain(): FormControl {
        return this.form.get('show_on_main') as FormControl;
    }

    get publishVal(): boolean {
        return this.publish.value === 'true';
    }

    checkShowOnMain(val) {
        if (val.currentTarget.value === 'false') {
            this.showOnMain.setValue(false);
            this.form.updateValueAndValidity();
        }
    }

    onSubmit(form) {
        form.publish = !(form.publish === 'false' || form.publish === false);
        if (!this.redactId) {
            this.newsCreateService.createSnippet(form).subscribe(
                // а в общий компонент передается новый массив сниппетов
                (data) => {
                    this.snippetsChange.emit(data);
                    this.close.emit();
                },
                (err) => {
                    alert('Что-то пошло не так!');
                    console.error(err);
                }
            );
        } else {
            this.newsCreateService.updateSnippet(this.redactId, form).subscribe(
                // а в общий компонент передается новый массив сниппетов
                (data) => {
                    this.snippetsChange.emit(data);
                    this.close.emit();
                },
                (err) => {
                    alert('Что-то пошло не так!');
                    console.error(err);
                }
            );
        }
    }

}
