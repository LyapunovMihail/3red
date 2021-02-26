import { AdminContactsService } from './admin-contacts.service';
import { PhoneObserverService } from './phone.observer.service';
import { WindowScrollLocker } from '../commons/window-scroll-block';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPhone, IMail } from '../../../serv-files/serv-modules/contacts-api/contacts.interfaces';

@Component({
    selector : 'app-admin-contacts',
    templateUrl : './admin-contacts.component.html',
    styleUrls : [ './admin-contacts.component.scss' ],
    providers : [
        WindowScrollLocker
    ]
})

export class AdminContactsComponent implements OnInit, OnDestroy {

    isAuthorizated = false ;

    isShowModal = false;

    AuthorizationEvent;

    phone = '';

    mails: IMail[] = [];

    constructor(
        private phoneObserver: PhoneObserverService,
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        private service: AdminContactsService
    ) { }

    ngOnInit() {
        this.service.getPhone().subscribe( ( data: IPhone ) => {
            this.phone = data.phone;
            this.phoneObserver.setPhone(data.phone);
        });

        // подписка на авторизацию
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
            if (val) { this.getMail(); }
        });
    }

    ngOnDestroy() {
        if (this.AuthorizationEvent) {
            this.AuthorizationEvent.unsubscribe();
        }
    }

    updatePhone(event) {
        this.service.updatePhone( event.target.value ).subscribe(
            ( data: IPhone ) => {
                this.phone = data.phone;
                this.phoneObserver.setPhone(this.phone);
            },
            (error) => console.error(error)
        );
    }

    getMail() {
        this.service.getMail().subscribe(
            ( data: IMail[] ) => this.mails = data,
            (error) => console.error(error)
        );
    }

    setMail() {
        this.service.setMail().subscribe(
            ( data: IMail[] ) => this.mails = data,
            (error) => console.error(error)
        );
    }

    deleteMail(id) {
        this.service.deleteMail(id).subscribe(
            ( data: IMail[] ) => this.mails = data,
            (error) => console.error(error)
        );
    }

    updateMail(id, value, status) {
        this.service.updateMail(id, value, status).subscribe(
            ( data: IMail[] ) => this.mails = data,
            (error) => console.error(error)
        );
    }
}
