import { Component, Input } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector : 'app-shares-items',
    templateUrl : './shares-items.component.html',
    styleUrls: ['./shares-items.component.scss'],
})

export class SharesItemsComponent {
    @Input() public snippets: Share[] = [];

    public uploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public activeTooltip: string;

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

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }
}
