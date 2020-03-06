import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { NewsCreateFormService } from './news-create-form.service';
import { Uploader } from 'angular2-http-file-upload';
import { NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector : 'app-news-create-form',
    templateUrl : './news-create-form.component.html',
    styleUrls : [ './../news-form.component.scss' ],
    providers : [
        Uploader,
        NewsCreateFormService
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

export class NewsCreateFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() isForm = false ;

    // вызывается при создании сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() snippetsChange = new EventEmitter();

    @Output() close = new EventEmitter();

    // путь для загрузки изображений
    uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    // инициализация формы
    form: FormGroup;

    // подписка на авторизацию
    isAuthorizated = false ;
    AuthorizationEvent;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad = false;

    public dateNow: string;

    public showModal = false;
    public textEditIndex: number;
    public textAreaForLinkAdd: HTMLTextAreaElement;
    public fakeTextAreaForLinkAdd: HTMLDivElement;

    constructor(
        private formBuilder: FormBuilder,
        private authorization: AuthorizationObserverService,
        private newsCreateService: NewsCreateFormService,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        moment.locale('ru');
        this.dateNow = moment(Date.now()).format('LL').slice(0, -3);

        this.form = this.formBuilder.group({
            created_at : '',
            last_modifyed : '',
            title : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(60)])],
            description : '',
            show_on_main : false,
            status: 'dirty',
            image : ['', Validators.required],
            thumbnail : ['', Validators.required],
            objectId: '',
            objectName: '',
            body: this.formBuilder.array([])
        });
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    showModalFunc(obj) {
        console.log('obj: ', obj);
        this.showModal = true;
        this.textAreaForLinkAdd = obj.textArea;
        this.fakeTextAreaForLinkAdd = obj.fakeTextArea;
    }
    public get body(): FormArray { return this.form.get('body') as FormArray; }

    public addDescription(order?: number, value?: string) {
        this.body.push(new FormControl({
            blockType: 'description',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockDescription: value ? value : ''
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
        console.log('this.body: ', this.body);
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
                    image2: this.body.at(i).value.image2 ? this.body.at(i).value.image2 : '',
                    thumbnail2: this.body.at(i).value.thumbnail2 ? this.body.at(i).value.thumbnail2 : ''
                }
            });
        } else {
            this.body.at(i).setValue({
                blockType: 'image2',
                blockOrderNumber: this.body.at(i).value.blockOrderNumber,
                blockImg2: {
                    image: this.body.at(i).value.image ? this.body.at(i).value.image : '',
                    thumbnail: this.body.at(i).value.thumbnail ? this.body.at(i).value.thumbnail : '',
                    image2: data.image,
                    thumbnail2: data.thumbnail
                }
            });
        }
    }

    public addList(order?: number, value?: string[]) {
        this.body.push(new FormControl({
            blockType: 'header',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockList: value ? value : ['']
        }));
    }

    public removeBlock(cnt) {
        if (confirm('Удалить секцию?')) {
            this.body.removeAt(cnt);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // при открытии формы
        if ( this.isForm ) {
            // сбрасываются значения
            this.form.reset();
            // и добавляются дефолтные поля
            const date = new Date();
            // дата создания и последнего редактирования равны
            this.form.controls.created_at.setValue(date);
            this.form.controls.last_modifyed.setValue(date);
        }
    }

    // добавление картинок в форму
    imageUpload(e: Event, type: string,  i?: number, isFirst?: number) {
        if ( this.isAuthorizated ) {
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
                .then( (data: any) => {
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

    onSubmit(form) {

        this.close.emit();
        this.newsCreateService.formSubmit(form).subscribe(
            // а в общий компонент передается новый массив сниппетов
            (data) => this.snippetsChange.emit(data),
            (err) => {
                alert('Что-то пошло не так!');
                console.error(err);
            }
        );
    }

}
