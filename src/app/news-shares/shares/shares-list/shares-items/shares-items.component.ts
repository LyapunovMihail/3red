import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector : 'app-shares-items',
    templateUrl : './shares-items.component.html',
    styleUrls: ['./shares-items.component.scss'],
})

export class SharesItemsComponent {

    @Input() public isAuthorizated: boolean = false;

    @Input() public snippetsArray: Share[] = [];

    @Input() public indexNum: number;

    @Output() public deleteSnippet = new EventEmitter();

    @Output() public redactSnippet = new EventEmitter();

    public uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    constructor() {
        moment.locale('ru');
    }

    public countDown(finishDate) {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(finishDate);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }
}
