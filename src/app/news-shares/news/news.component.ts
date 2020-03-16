import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-news',
    template: `
        <router-outlet></router-outlet>
    `,
    encapsulation : ViewEncapsulation.None
})

export class NewsComponent { }
