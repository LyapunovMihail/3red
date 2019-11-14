import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-news',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./news.component.scss', './news.admin.scss'],
    encapsulation : ViewEncapsulation.None
})

export class NewsComponent { }
