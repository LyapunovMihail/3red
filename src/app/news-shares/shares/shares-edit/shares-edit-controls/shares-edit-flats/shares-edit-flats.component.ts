import { SharesService } from '../../../shares.service';
import {
    ShareBodyBlock,
    ShareFlatDecorationEnum,
    ShareFlatDiscountType,
    SHARES_UPLOADS_PATH
} from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

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
    @Input() public objectId: string;
    // @Input() public modsBtnList; // в addresses.controller добавить свойство objectId в modsBtnsList
    // Сделать селект из modsBtnList
    public housesOptions = [];
    public sectionsOptions = [];
    public flatsOptions = [];

    public ShareFlatDiscountType = ShareFlatDiscountType;

    public flats = [];

    public conf: ShareBodyBlock;

    public config: {jk: IObjectSnippet, housesBtnList, floorCount, config};

    uploadsPath = `/${SHARES_UPLOADS_PATH}`;

    constructor(
        private sharesService: SharesService
    ) {}

    writeValue(value: any) {
        this.conf = value;
        if (this.conf.blockFlat) {
            // if (this.objectId)
            this.getConfig();
            console.log('this.conf: ', this.conf);
        }
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}

    public getConfig() {
        this.sharesService.getFlatsDataByObjectId(this.objectId)
            .subscribe((data) => {
                    this.config = data;
                    this.initHousesOptions();
                },
                (err) => console.error(err)
            );
    }

    initHousesOptions() {
        this.housesOptions = Object.keys(this.config.floorCount);
        if (this.conf.blockFlat.house) {
            this.changeHouse(this.conf.blockFlat.house, false);
        }
    }
    changeHouse(house, changeByClick = true) {
        this.initSectionsOptions(house, changeByClick);
    }

    initSectionsOptions(house, changeByClick = true) {
        this.sectionsOptions = Object.keys(this.config.floorCount[house]);

        if (changeByClick) {
            this.conf.blockFlat.section = null;
            this.resetFlat(true, false);
            this.flatsOptions = [];
        }

        if (this.conf.blockFlat.section) {
            this.changeSection(this.conf.blockFlat.section, changeByClick);
        }
        console.log('this.conf: ', this.conf);
    }
    changeSection(section, changeByClick = true) {
        this.sharesService.getFlats({mod: this.conf.blockFlat.mod, houses: this.conf.blockFlat.house, sections: section})
            .subscribe((data) => {
                this.flats = data;
                this.initFlatsOptions(changeByClick);
            },
                (err) => console.error(err)
            );
    }

    initFlatsOptions(changeByClick = true) {
        if (!this.flats.length) {
            return;
        }

        this.flatsOptions = this.flats.map((flat) => flat.flat);
        if (changeByClick) {
            this.resetFlat(true, true);
        }
    }

    resetFlat(saveHouse, saveSection) {
        this.conf.blockFlat = {
                mod: this.conf.blockFlat.mod,
                jkName: this.conf.blockFlat.jkName,
                deliveryDate: null,
                house: saveHouse ? this.conf.blockFlat.house : null,
                flat: null,
                section: saveSection ? this.conf.blockFlat.section : null,
                floor: null,
                space: null,
                rooms: null,
                decoration: null,
                decorationName: null,
                scheme: null,
                price: null,
                discount: '',
                discountType: ShareFlatDiscountType.SUM
            };
    }

    changeFlat(e) {
        const flat = this.flats.find((flatItem) => flatItem.flat === Number(e));
        if (flat == null) {
            return;
        }
        this.conf.blockFlat.house = flat.house;
        this.conf.blockFlat.floor = flat.floor;
        this.conf.blockFlat.space = flat.space;
        this.conf.blockFlat.rooms = flat.rooms;

        switch (flat.decoration) {
            case '00':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.WITHOUT;
                break;
            case '01':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.ROUGHING;
                break;
            case '02':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.WITHOUT_WITH_WALLS;
                break;
            case '03':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.CLEAN;
                break;
            case '04':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.LIGHT;
                break;
            case '05':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.DARK;
                break;
            case '08':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.CLEAN;
                break;
            case '09':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.CLEAN;
                break;
            case '14':
                this.conf.blockFlat.decorationName = ShareFlatDecorationEnum.CLEAN;
                break;
            default:
                this.conf.blockFlat.decorationName = null;
        }
        this.conf.blockFlat.deliveryDate = flat.deliveryDate;
        this.conf.blockFlat.scheme = `/assets/floor-plans/jk_${flat.mod}/house_${flat.house}/section_${flat.section}/floor_${flat.floor}/${flat.floor}floor_${flat.flat}flat.svg`;
        this.conf.blockFlat.price = flat.price;
    }


    getDiscount(): number {
        if (this.conf.blockFlat.discountType === ShareFlatDiscountType.PERCENT) {
            const discount = +this.conf.blockFlat.price * (+this.conf.blockFlat.discount / 100);
            return +discount.toFixed(2);
        }
        return +this.conf.blockFlat.discount;
    }
}
