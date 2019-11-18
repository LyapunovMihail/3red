import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.service';

export const ROOT_SELECTOR = 'app-root';

@Component({
    selector: ROOT_SELECTOR,
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: `
        <!-- <app-authorization></app-authorization> -->

        <section>

            <app-header></app-header>

            <router-outlet></router-outlet>

            <app-footer></app-footer>

        </section>

        <app-overlay></app-overlay>
        <app-img-modal></app-img-modal>
    `
})
export class AppComponent implements OnInit {

    public previousUrl: string;
    public currentUrl: string;

    constructor(
        public appState: AppState,
        private router: Router,
    ) {}

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        this.router.events.subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            this.previousUrl = this.currentUrl;
            this.currentUrl = this.router.url;
            window.scrollTo(0, 0);
        });
    }
}
