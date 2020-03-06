import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { IconModifycatorsRadioBtns, ShowOnMainRadioBtns } from './../resources';
import { NewsRedactFormService } from './news-redact-form.service';
import { Uploader } from 'angular2-http-file-upload';
import { INewsSnippet, NEWS_UPLOADS_PATH, NewsBodyBlock, NewsBodyEnum } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector : 'app-news-redact-form',
    templateUrl : './news-redact-form.component.html',
    styleUrls : [ './../news-form.component.scss' ],
    providers : [
        Uploader,
        NewsRedactFormService
    ]
})

/*

    При открытии формы ее значения сбрасываются, устанавливаются значения радактируемого сниппета.

    Поля image, thumbnail - текстового типа. Они скрыты. Заполняются при добавлении изображения,
    которое тут же отправляется на сервер, а пришедший ответ записывается в эти скрытые инпуты.

    Блок с иконками для отображения на главной странице по умолчанию скрыт, и появляется
    при выборе поля "показывать на главной странице".

*/

export class NewsRedactFormComponent implements OnInit, OnChanges, OnDestroy {

    // инициализация формы
    form: FormGroup;

    snippet: INewsSnippet ;

    @Input() isForm: boolean = false ;

    @Input() redactId: any ;

    @Input() snippetsArray: INewsSnippet[] = [] ;

    // вызывается при изменении сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() snippetsChange = new EventEmitter();

    @Output() close = new EventEmitter();

    // если не выбрано поле "показать на главной странице"
    // то иконки-модификаторы отображаться не будут
    iconDisplay = 'none';

    // массив с иконками-модификаторами ( radiobuttons )
    // для выбора иконки с которой будет отображение на главной странице
    iconModifycators = IconModifycatorsRadioBtns;

    // кнопки выбора показа на главной
    showOnMainModifycators = ShowOnMainRadioBtns;

    // превью загруженного изображения
    loadedImage: string = '';

    // путь для загрузки изображений
    uploadsPath: string = `/${NEWS_UPLOADS_PATH}`;

    // подписка на авторизацию
    isAuthorizated: boolean = false ;
    AuthorizationEvent;

    public imageUploadEvent;
    public imageUploadPercent: number;
    public isLoad: boolean = false;

    public dateNow: string;

    constructor(
        private formBuilder: FormBuilder,
        private authorization: AuthorizationObserverService,
        private newsRedactService: NewsRedactFormService,
        public ref: ChangeDetectorRef
    ) { }

    // добавление картинок в форму
    imageUpload(e) {
        if ( this.isAuthorizated ) {
            this.isLoad = true;
            this.imageUploadEvent = this.newsRedactService.getPercentLoadedImage().subscribe(
                (val) => {
                    this.imageUploadPercent = val;
                    this.ref.detectChanges();
                },
                (err) => {
                    this.isLoad = false;
                    this.imageUploadEvent.unsubscribe();
                }
            );

            this.newsRedactService.imageUpload(e)
            .then( (data: any) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                // сразу сохраняется на сервере
                // значение подставляется в превью
                this.loadedImage = data.thumbnail;
                // и в текстовые (скрытые) инпуты формы
                this.form.controls['image'].setValue(data.image);
                this.form.controls['thumbnail'].setValue(data.thumbnail);
            })
            .catch((err) => {
                this.isLoad = false;
                this.imageUploadEvent.unsubscribe();
                alert('Что-то пошло не так!');
                console.error(err);
            });
        }
    }

    ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        moment.locale('ru');
        this.dateNow = moment(Date.now()).format('LL').slice(0, -3);

        this.form = this.formBuilder.group({
            created_at : '',
            last_modifyed : '',
            category : '',
            title : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(60)])],
            description : '',
            descrPreview: ['', Validators.maxLength(60)],
            show_on_main : '',
            image : '',
            thumbnail : '',
            icon_mod : '',
            objectId: '',
            objectName: '',
            body: this.formBuilder.array([])
        });
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
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
            blockType: 'image',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockImg2: obj ? obj : {
                image: '',
                thumbnail: '',
                image2: '',
                thumbnail2: ''
            }
        }));
    }

    public addList(order?: number, value?: string[]) {
        this.body.push(new FormControl({
            blockType: 'list',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockList: value ? value : ['']
        }));
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( this.isForm ) {
            // при открытии формы расставляются значения редактируемого сниппета
            this.snippet = this.snippetsArray.filter((item) => item._id === this.redactId)[0];
            if ( this.snippet ) {
                this.form.reset(this.snippet);
                this.form.get('last_modifyed').setValue(new Date().toISOString());
                this.loadedImage = this.snippet.thumbnail;
                (this.snippet.body as NewsBodyBlock[]).forEach((body: NewsBodyBlock) => {
                    if (body.blockType === NewsBodyEnum.IMAGE) {
                        this.addImage(body.blockOrderNumber, body.blockImg);
                    } else if (body.blockType === NewsBodyEnum.IMAGE2) {
                        this.addImage2(body.blockOrderNumber, body.blockImg2);
                    } else if (body.blockType === NewsBodyEnum.HEADER) {
                        this.addList(body.blockOrderNumber, body.blockList);
                    } else if (body.blockType === NewsBodyEnum.DESCRIPTION) {
                        this.addDescription(body.blockOrderNumber, body.blockDescription);
                    }
                });
            } else {
                alert('Что-то пошло не так!');
                this.isForm = false;
            }
        }
    }

    onSubmit(form) {
        // если форма валидна, то при отправке
        // вызывается событие закрытия формы
        this.close.emit();
        this.newsRedactService.formSubmit(this.redactId, form).subscribe(
            // а в общий компонент передается новый массив сниппетов
            (data) => this.snippetsChange.emit(data),
            (err) => {
                alert('Что-то пошло не так!');
                console.error(err);
            }
        );
    }

    // public save() {
    //     this.galleryService.setTabsSnippetData(this.form.value).subscribe(
    //         (data) => {
    //             this.galleryService.removeTabSlidesFromGallery(data).subscribe(
    //                 () => {
    //                     this.snippetChange.emit(data);
    //                     this.closeModal.emit(true);
    //                 },
    //                 (err) => console.error(err)
    //             );
    //         },
    //         (err) => {
    //             alert('Что-то пошло не так!');
    //             console.error(err);
    //         });
    // }
    //
    // public close(isSave) {
    //     if (isSave) {
    //         this.save();
    //     } else {
    //         this.closeModal.emit(true);
    //     }
    // }
}
