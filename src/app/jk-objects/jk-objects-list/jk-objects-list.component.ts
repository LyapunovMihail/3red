import { Component, OnDestroy, OnInit } from '@angular/core';
import { JkObjectsListService } from './jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    public snippetsAll: IObjectSnippet[];
    public snippets: IObjectSnippet[];

    public districts: string[];
    public btnList: any[];

    public closeModal = true;
    public authorizationEvent;
    public isAuthorizated = false;
    public formEvents: any;

    public form: FormGroup;
    // открытие формы редактирования-создания
    public redactId: any;

    constructor(
        private authorization: AuthorizationObserverService,
        private objectService: JkObjectsListService,
        public formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.form = this.formBuilder.group({
            price: {
                min: 1000000,
                max: 10000000
            },
            districts: [],
            status: 'Все'
        });

        this.formEvents = this.form.valueChanges.subscribe((form) => {
            this.filterObjects(form);
        });

        this.objectService.getSnippets()
            .subscribe((data) => {
                this.snippetsAll = data;
                this.snippets = data;
                this.getDistricts();
                console.log('this.snippets: ', this.snippets);
            });
    }

    public filterObjects(form) {
        console.log('this.form: ', form);
        if (form.status !== 'Все') {
            this.snippets = this.snippetsAll.filter((item) => item.status === form.status);
        } else {
            this.snippets = this.snippetsAll;
        }

        this.snippets = this.snippets.filter((item) => {
            const end = item.address.indexOf('район') + 5;
            const name = item.address.slice(0, end);
            return form.districts.some((district) => district === name);
        });

    }

    private getDistricts() {
        this.districts = [];
        this.btnList = [];
        this.districts.push('Все районы');
        this.btnList.push({ name: 'Все районы', value: 'Все районы' });
        this.snippetsAll.forEach((item) => {
            const end = item.address.indexOf('район') + 5;
            const name = item.address.slice(0, end);
            if (!this.districts.includes(name)) {
               this.districts.push(name);
               this.btnList.push({ name: name, value: name });
            }
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

    public snippetsChange(snippets) {
        this.snippets = snippets;
        this.getDistricts();
    }
}
