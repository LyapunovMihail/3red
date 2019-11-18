import { SharesService } from '../../../shares.service';
import {
    ShareBodyBlock,
    ShareFlat,
    ShareFlatRoomEnum,
    ShareFlatDecorationEnum,
    ShareFlatDiscountType,
    SHARES_UPLOADS_PATH
} from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
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

    public sectionsOptions = ['1', '2', '3', '4'];

    public flats = [];

    public flatsOptions = [];

    public roomSelectOpen: number;

    public shareFlatDiscountType = ShareFlatDiscountType;

    public conf: ShareBodyBlock;

    uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    constructor(
        private sharesService: SharesService
    ) {}

    writeValue(value: any) {
        this.conf = value;
        if (this.conf.blockFlats.length > 0) {
            this.conf.blockFlats.forEach((flat: ShareFlat, i: number) => {
                this.changeSection(flat.section, i);
            });
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}

    changeText() {
        this.propagateChange(this.conf);
    }

    public removeItem(i) {
        if (this.conf.blockFlats.length > 1) {
            if (confirm('Удалить квартиру?')) {
                this.conf.blockFlats.splice(i, 1);
                this.flats.splice(i, 1);
                this.flatsOptions.splice(i, 1);
            }
        } else {
            this.remove.next();
        }
    }

    addFlat() {
        const flat = {
            house: null,
            number: null,
            section: null,
            floor: null,
            space: null,
            room: null,
            decoration: null,
            scheme: null,
            price: null,
            discount: null,
            discountType: ShareFlatDiscountType.SUM
        };
        this.conf.blockFlats.push(flat);
    }

    changeSection(e, i) {
        this.sharesService.getFlatsBySectionNum(e)
            .subscribe((data) => {
                this.flats.splice(i, 0, data);
                this.initFlatsOptions(i);
            });
    }

    changeFlat(e, i) {
        const flat = this.flats[i].find((flatItem) => flatItem.flat === Number(e));
        if (flat == null) {
            return;
        }
        this.conf.blockFlats[i].house = flat.house;
        this.conf.blockFlats[i].floor = flat.floor;
        this.conf.blockFlats[i].space = flat.space;
        switch (flat.rooms) {
            case 0:
                this.conf.blockFlats[i].room = ShareFlatRoomEnum.STUDIO;
                break;
            case 1:
                this.conf.blockFlats[i].room = ShareFlatRoomEnum.ONE_ROOM;
                break;
            case 2:
                this.conf.blockFlats[i].room = ShareFlatRoomEnum.TWO_ROOM;
                break;
            case 3:
                this.conf.blockFlats[i].room = ShareFlatRoomEnum.THREE_ROOM;
                break;
            default:
                this.conf.blockFlats[i].room = null;
        }
        switch (flat.decoration) {
            case '00':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.WITHOUT;
                break;
            case '01':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.ROUGHING;
                break;
            case '02':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.WITHOUT_WITH_WALLS;
                break;
            case '03':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.CLEAN;
                break;
            case '04':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.LIGHT;
                break;
            case '05':
                this.conf.blockFlats[i].decoration = ShareFlatDecorationEnum.DARK;
                break;
            default:
                this.conf.blockFlats[i].decoration = null;
        }
        this.conf.blockFlats[i].scheme = `/assets/floor-plans/section_${flat.section}/floor_${flat.floor}/${flat.floor}floor_${flat.flat}flat.svg`;
        this.conf.blockFlats[i].price = flat.price;
    }

    initFlatsOptions(i) {
        if (this.flats[i] == null || this.flats[i].length === 0) {
            return;
        }

        this.flatsOptions.splice(i, 0, this.flats[i].map((flat) => {
            return flat.flat;
        }));
    }

    getDiscount(i): number {
        if (this.conf.blockFlats[i].discountType === ShareFlatDiscountType.PERCENT) {
            const discount = +this.conf.blockFlats[i].price * (+this.conf.blockFlats[i].discount / 100);
            return +discount.toFixed(2);
        }
        return +this.conf.blockFlats[i].discount;
    }
}
