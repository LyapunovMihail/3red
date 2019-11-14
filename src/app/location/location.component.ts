import { Component } from '@angular/core';

@Component({
    selector: 'app-location',
    template: `
        <section class="location">
            <router-outlet></router-outlet>
        </section>
    `,
    styleUrls: ['./location.component.scss']
})

export class LocationComponent {

    constructor () {}

}
