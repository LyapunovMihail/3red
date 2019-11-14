import { Component } from '@angular/core';

@Component({
    selector: 'app-scroll-up',
    template: `
        <div class="scroll__up">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54">
                <g fill="none" fill-rule="evenodd">
                    <circle cx="27" cy="27" r="26.5" fill="#FFF" stroke="#CDA571" opacity=".899"/>
                    <path fill="#CDA571" d="M26.581 22.654l-9.906 8.93a.498.498 0 0 0 0 .758c.233.21.607.21.84 0L27 23.792l9.484 8.55c.234.21.608.21.841 0a.514.514 0 0 0 .176-.377.498.498 0 0 0-.176-.376l-9.906-8.93a.638.638 0 0 0-.837-.005z"/>
                </g>
            </svg>
        </div>
    `,
    styleUrls: ['./scroll-up.component.scss']
})
export class ScrollUpComponent {

    constructor() { }
}
