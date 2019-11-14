import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { IconModifycatorsRadioBtns, ShowOnMainRadioBtns } from './../resources';
import { NewsCreateFormService } from './news-create-form.service';
import { Uploader } from 'angular2-http-file-upload';
import { EnumNewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

    @Input() isForm: boolean = false ;

    // вызывается при создании сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() snippetsChange = new EventEmitter();

    @Output() close = new EventEmitter();

    enumCategory = EnumNewsSnippet ;

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

    // инициализация формы
    form: FormGroup;

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
        private newsCreateService: NewsCreateFormService,
        public ref: ChangeDetectorRef
    ) { }

    // добавление картинок в форму
    imageUpload(e) {
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
            category : this.enumCategory.NEW,
            title : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(60)])],
            description : '',
            descrPreview: ['', Validators.maxLength(60)],
            show_on_main : [false],
            image : ['', Validators.required],
            thumbnail : ['', Validators.required],
            icon_mod : ''
        });
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        // при открытии формы
        if ( this.isForm ) {
            // сбрасываются значения
            this.form.reset();
            // и добавляются дефолтные поля
            let date = new Date();
            // дата создания и последнего редактирования равны
            this.loadedImage = '';
            this.form.controls['category'].setValue(this.enumCategory.NEW);
            this.form.controls['created_at'].setValue(date);
            this.form.controls['last_modifyed'].setValue(date);
            this.form.controls['icon_mod'].setValue('1');
        }
    }

    onSubmit(form) {
        // если форма вылидна, то при отправке
        // вызывается событие закрытия формы

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
