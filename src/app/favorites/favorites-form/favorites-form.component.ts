import { FavoritesService } from './../../commons/favorites.service';
import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import {
    Component,
    Output,
    EventEmitter,
    Input,
} from '@angular/core';

@Component({
    selector: 'app-favorites-form',
    templateUrl: './favorites-form.component.html',
    styleUrls: ['./favorites-form.component.scss']
})
export class FavoritesFormComponent {

    @Input() pdfUrls: string[];
    @Input() isOpen: boolean;
    @Output() close: EventEmitter < boolean > = new EventEmitter < boolean > ();

    form: FormGroup;

    constructor(
        private favoritesService: FavoritesService,
    ) {
        this.form = new FormGroup({
            mail: new FormControl(null, Validators.required),
            agreement: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const text = this.pdfUrls.join('<br />');
        const options = {
            email: this.form.value.mail,
            text
        };
        this.favoritesService.sendPdf(options)
            .subscribe((data) => {
                this.form.reset();
                this.close.emit(true);
            });
    }

    get validateEmail(): boolean {
        const email = this.form.get('mail').value;
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(email).toLowerCase());
    }

    get disableBtn() {
        return !this.form.valid || !this.form.get('agreement').value || !this.validateEmail;
    }

}
