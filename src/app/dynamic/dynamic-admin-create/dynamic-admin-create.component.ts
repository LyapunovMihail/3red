import { AuthorizationObserverService } from './../../authorization/authorization.observer.service';
import { DynamicAdminCreateService } from './dynamic-admin-create.service';
import { IDynamicObject } from '../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-admin-create',
    templateUrl: './dynamic-admin-create.component.html',
    styleUrls: ['./dynamic-admin-create.component.scss'],
    providers: [
        DynamicAdminCreateService
    ]
})

export class DynamicAdminCreateComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public month: number;
    @Input() public year: number;
    @Input() public objectsArray: IDynamicObject[] = [];

    @Output() public changeObjectsArray: EventEmitter<IDynamicObject[]> = new EventEmitter();
    @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();

    public form: FormGroup = this.formBuilder.group({
        year: this.year,
        month: this.month,
        title: ['', Validators.compose([ Validators.required, Validators.minLength(1)])],
    });

    public AuthorizationEvent;
    public isAuthorizated: boolean = false;

    public tagsArray: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private authorization: AuthorizationObserverService,
        private dynamicAdminCreateService: DynamicAdminCreateService
    ) { }

    public ngOnInit() {
        // подписка на авторизацию
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.form.controls['month'].setValue(this.month);
        this.form.controls['year'].setValue(this.year);
        this.tagsArray = this.uniqueGenerateArray(this.objectsArray);
    }

    public uniqueGenerateArray(arr) {
        const obj = {};
        arr.forEach((str) => {
            obj[str.title] = true;
        });
        return Object.keys(obj);
    }

    public onSubmit(form) {
        this.form.reset();
        this.form.controls['month'].setValue(this.month);
        this.form.controls['year'].setValue(this.year);
        const accept = confirm('Создать новый объект?');
        if (accept) {
            this.dynamicAdminCreateService.createObject(form).subscribe(
                (data: IDynamicObject[]) => this.changeObjectsArray.emit(data),
                (err) => {
                    alert('Что-то пошло не так!');
                    console.error(err);
                }
            );
        }
    }
}
