import { SharesService } from '../../../shares.service';
import {
    ShareBodyBlock,
    ShareFlatRoomEnum,
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

    public housesOptions = [];
    public sectionsOptions = [];
    public flatsOptions = [];

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
            this.getConfig();
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
    }
    changeHouse(house) {
        this.initSectionsOptions(house);
    }


    initSectionsOptions(house) {
        this.sectionsOptions = Object.keys(this.config.floorCount[house]);
    }
    changeSection(section) {
        this.sharesService.getFlats({mod: this.conf.blockFlat.mod, houses: this.conf.blockFlat.house, sections: section})
            .subscribe((data) => {
                this.flats = data;
                this.initFlatsOptions();
            },
                (err) => console.error(err)
            );
    }

    initFlatsOptions() {
        if (!this.flats.length) {
            return;
        }

        this.flatsOptions = this.flats.map((flat) => flat.flat);
    }
    changeFlat(e) {
        const flat = this.flats.find((flatItem) => flatItem.flat === Number(e));
        if (flat == null) {
            return;
        }
        this.conf.blockFlat.house = flat.house;
        this.conf.blockFlat.floor = flat.floor;
        this.conf.blockFlat.space = flat.space;
        switch (flat.rooms) {
            case 0:
                this.conf.blockFlat.room = ShareFlatRoomEnum.STUDIO;
                break;
            case 1:
                this.conf.blockFlat.room = ShareFlatRoomEnum.ONE_ROOM;
                break;
            case 2:
                this.conf.blockFlat.room = ShareFlatRoomEnum.TWO_ROOM;
                break;
            case 3:
                this.conf.blockFlat.room = ShareFlatRoomEnum.THREE_ROOM;
                break;
            default:
                this.conf.blockFlat.room = null;
        }
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
        this.conf.blockFlat.scheme = `/assets/floor-plans/jk_${flat.mod}/section_${flat.section}/floor_${flat.floor}/${flat.floor}floor_${flat.flat}flat.svg`;
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
