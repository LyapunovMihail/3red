import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { SharesService } from '../../../shares.service';
import {
    ShareFlat,
    ShareFlatDiscountType,
    SHARES_UPLOADS_PATH
} from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-shares-edit-flats',
    templateUrl: './shares-edit-flats.component.html',
    styleUrls: [
        './shares-edit-flats.component.scss',
        './../../shares-edit.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SharesEditFlatsComponent),
            multi: true
        }
    ]
})
export class SharesEditFlatsComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();

    @Input() formControlName: any;

    public sectionsOptions = ['1', '2', '3', '4'];

    public housesOptions = ['1', '2', '3', '9'];

    public flats = [];

    public flatsOptions = [];

    public shareFlatDiscountType = ShareFlatDiscountType;

    public shareFlat: ShareFlat;

    uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    constructor(
        private sharesService: SharesService
    ) {}

    writeValue(value: any) {
        this.shareFlat = value;
        if (this.shareFlat) {
            this.changeSectionAndHouse({section: this.shareFlat.section, house: this.shareFlat.house});
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}

    changeText() {
        this.propagateChange(this.shareFlat);
    }

    public removeItem() {
        this.remove.next();
    }

    changeSectionAndHouse(params) {
        this.sharesService.getFlatsBySectionAndHouse(params)
            .subscribe((data: IAddressItemFlat[]) => {
                this.flats = data;
                this.initFlatsOptions();
            });
    }

    changeFlat(e) {
        const flat = this.flats.find((flatItem) => flatItem.flat === Number(e));
        if (flat == null) {
            return;
        }
        this.shareFlat = {discountType: this.shareFlat.discountType, discountValue: this.shareFlat.discountValue, ...flat};
    }

    initFlatsOptions() {
        if (this.flats.length === 0) {
            return;
        }

        this.flatsOptions = this.flats.map((flat) => {
            return flat.flat;
        });
    }
}
