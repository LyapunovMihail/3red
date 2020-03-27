import { Component, OnDestroy, OnInit } from '@angular/core';
import { JkObjectsListService } from './jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';

@Component({
    selector: 'app-jk-objects-list',
    templateUrl: './jk-objects-list.component.html',
    styleUrls: ['./jk-objects-list.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class JkObjectsListComponent implements OnInit, OnDestroy {

    public showPopUp = false;
    public showMap = false;
    public snippets: IObjectSnippet[];

    public closeModal = true;
    public authorizationEvent;
    public isAuthorizated = false;

    // открытие формы редактирования-создания
    public redactId: any ;
    public isDeleteForm = false;

    constructor(
        private authorization: AuthorizationObserverService,
        private objectService: JkObjectsListService
    ) {
    }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.objectService.getSnippets()
            .subscribe((data) => {
                this.snippets = data;
                console.log('this.snippets: ', this.snippets);
            });
    }

    ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
    }

    public createSnippet() {
        if ( this.isAuthorizated ) {
            this.closeModal = false ;
        }
    }

    public redactSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.closeModal = false;
        }
    }

    public deleteSnippet(id) {
        if ( this.isAuthorizated ) {
            if (confirm('Вы точно хотите удалить объект?')) {
                this.objectService.deleteSnippet(id)
                    .subscribe(
                        (data) => this.snippets = data,
                        (err) => console.error(err)
                    );
            }
        }
    }

    public updateSnippet(snippet) {
        this.objectService.updateSnippet(snippet._id, snippet)
            .subscribe(
                () => console.log('success'),
                (err) => console.error(err)
            );
    }
}
