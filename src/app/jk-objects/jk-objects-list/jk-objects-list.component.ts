import { Component, OnDestroy, OnInit } from '@angular/core';
import { JkObjectsListService } from './jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { Router } from '@angular/router';
import { JkObjectsNumberPipe } from './jk-objects-number.pipe';

@Component({
    selector: 'app-jk-objects-list',
    templateUrl: './jk-objects-list.component.html',
    styleUrls: ['./jk-objects-list.component.scss'],
    providers: [
        JkObjectsListService,
        JkObjectsNumberPipe
    ]
})
export class JkObjectsListComponent implements OnInit, OnDestroy {

    public showMap = false;
    public snippets: IObjectSnippet[];

    public closeModal = true;
    public authorizationEvent;
    public isAuthorizated = false;

    public btnList: any[] = [];
    public isLoaded = false;
    // открытие формы редактирования-создания
    public redactId: any;

    constructor(
        public router: Router,
        private authorization: AuthorizationObserverService,
        private objectService: JkObjectsListService,
    ) {
    }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.objectService.getSnippets()
            .subscribe((data) => {
                this.snippets = data;
                this.getDistricts();
            });
    }

    public getObjects(params) {
        this.router.navigate([this.router.url.split('?')[0]], {queryParams: params, preserveQueryParams: false});
        this.objectService.getSnippetsByParams(params).subscribe(
            (data) => {
                this.snippets = data;
            },
            (err) => {
                console.log(err);
            }
        );
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
                        (data) => {
                                this.snippetsChange(data);
                            },
                        (err) => console.error(err)
                    );
            }
        }
    }

    public updateSnippet(snippet) {
        this.objectService.updateSnippet(snippet._id, snippet)
            .subscribe(
                () => {
                   this.snippetsChange(this.snippets);
                },
                (err) => console.error(err)
            );
    }

    public snippetsChange(snippets) {
        this.snippets = snippets;
        this.getDistricts();
        this.router.navigate([this.router.url.split('?')[0]]);
    }

    private getDistricts() {
        console.log('this.btnList.length: ', this.btnList.length);
        this.btnList = [];
        console.log('this.btnList: ', this.btnList);
        this.btnList.push({ name: 'Все районы', value: 'Все районы' });
        this.snippets.forEach((item) => {
            if (!this.btnList.includes({ name: item.district, value: item.district })) {
                this.btnList.push({ name: item.district, value: item.district });
            }
        });
        this.isLoaded = true;
    }
}
