import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector : 'app-footer',
    templateUrl : './footer.component.html',
    styleUrls : ['./footer.component.scss'],
    providers: [
    ]
})

export class FooterComponent implements OnInit {

    public currentYear: number;
    @Input() public isContacts = false;

    constructor(
    ) { }

    public ngOnInit() {
        this.currentYear = this.getFullYear();
    }

    public getFullYear() {
        const date = new Date();
        return date.getFullYear();
    }
}
