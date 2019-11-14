import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { IconModifycatorsRadioBtns, ShowOnMainRadioBtns } from './../resources';
import { NewsRedactFormService } from './news-redact-form.service';
import { Uploader } from 'angular2-http-file-upload';
import { INewsSnippet, EnumNewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

    enumCategory = EnumNewsSnippet;

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
            icon_mod : ''
        });
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( this.isForm ) {
            // при открытии формы расставляются значения редактируемого сниппета
            this.snippet = this.snippetsArray.filter((item) => item._id === this.redactId)[0];
            if ( this.snippet ) {
                this.form.reset();
                this.loadedImage = this.snippet.thumbnail;
                for (let key in this.snippet ) {
                    if ( key !== '_id') {
                        this.form.controls[key].setValue((key === 'last_modifyed') ? new Date() : this.snippet[key]);
                    }
                }
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
}
