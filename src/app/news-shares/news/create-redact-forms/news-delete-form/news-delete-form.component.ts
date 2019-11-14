import { AuthorizationObserverService } from '../../../../authorization/authorization.observer.service';
import { NewsService } from '../../news.service';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { INewsSnippet } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Component({
    selector : 'app-news-delete-form',
    templateUrl : './news-delete-form.component.html',
    styleUrls : [ './../news-form.component.scss' ]
})

export class NewsDeleteFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public isForm: boolean = false ;

    // вызывается при создании сниппета, и передает в общий компонент
    // новый массив из ответа сервера
    @Output() public snippetsChange = new EventEmitter();

    @Input() public redactId: any ;

    @Input() public snippetsArray: INewsSnippet[] = [] ;

    @Output() public close = new EventEmitter();

    // подписка на авторизацию
    public isAuthorizated: boolean = false ;
    public AuthorizationEvent;

    constructor(
        private authorization: AuthorizationObserverService,
        private newsService: NewsService,
        public ref: ChangeDetectorRef
    ) { }

    public ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges) {
    }

    public onSubmit() {

        this.close.emit();
        this.newsService.deleteSnippet(this.redactId).subscribe(
            // а в общий компонент передается новый массив сниппетов
            (data) => this.snippetsChange.emit(data),
            (err) => {
                alert('Что-то пошло не так!');
                console.error(err);
            }
        );
    }

}
