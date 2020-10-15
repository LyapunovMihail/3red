import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-form-confirm',
    templateUrl: './form-confirm.component.html',
    styleUrls: ['./../forms-request.component.scss']
})
export class FormConfirmComponent implements OnChanges {

    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Input() isOpen = false;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes: ', changes);
        if ( 'isOpen' in changes && this.isOpen === true ) {
            setTimeout(() => {
               this.isOpen = false;
            }, 9000);
        }
    }

}
