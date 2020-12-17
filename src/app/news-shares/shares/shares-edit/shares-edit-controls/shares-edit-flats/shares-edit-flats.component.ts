import { SharesService } from '../../../shares.service';
import {
    ShareBodyBlock,
    ShareFlatDecorationEnum,
    ShareFlatDiscountType,
    SHARES_UPLOADS_PATH
} from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, forwardRef, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
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
    public modsBtnList: {name: string, value: string, objectId: string}[];
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
        private sharesService: SharesService,
        private ref: ChangeDetectorRef
    ) {}

    writeValue(value: any) {
        this.conf = value;
        if (this.conf.blockFlat) {
            // if (this.objectId)
            this.getMods();
        }
    }


    propagateChange = (_: any) => {};

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}

    public getMods() {
        this.sharesService.getFlatsData({})
            .subscribe((data) => {
                    data.modsBtnList.shift();
                    this.modsBtnList = data.modsBtnList;
                    if (this.conf.blockFlat.jkId) {
                        this.getConfig();
                    }
                },
                (err) => console.error(err)
            );
    }

    public changeMod(e) {
        const selectedValue = this.modsBtnList[e.target.selectedIndex];
        this.conf.blockFlat.jkId = selectedValue.objectId;
        this.conf.blockFlat.mod = selectedValue.value;
        this.conf.blockFlat.jkName = selectedValue.name;
        this.resetFlat(false, false);
        this.housesOptions = [];
        this.sectionsOptions = [];
        this.flatsOptions = [];
        this.getConfig();
    }

    public getConfig() {
        this.sharesService.getFlatsDataByObjectId(this.conf.blockFlat.jkId)
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
            this.initSectionsOptions(this.conf.blockFlat.house);
        }
    }
    changeHouse(house) {
        this.resetFlat(true, false);
        this.sectionsOptions = [];
        this.flatsOptions = [];
        this.initSectionsOptions(house);
    }

    initSectionsOptions(house) {

        this.sectionsOptions = Object.keys(this.config.floorCount[house]);
        if (this.sectionsOptions.length === 1) {
            this.conf.blockFlat.section = this.sectionsOptions[0];
        }
        this.ref.detectChanges();
        if (this.conf.blockFlat.section) {
            this.initFlatsOptions(this.conf.blockFlat.section);
        }
    }
    changeSection(section) {
        this.resetFlat(true, true);
        this.flatsOptions = [];
        this.initFlatsOptions(section);
    }

    initFlatsOptions(section) {
        this.sharesService.getFlats({mod: this.conf.blockFlat.mod, houses: this.conf.blockFlat.house, sections: section})
            .subscribe((data) => {
                    this.flats = data;
                    if (!this.flats.length) {
                        return;
                    }
                    this.flatsOptions = this.flats.map((flat) => flat.flat);
                    if (this.flatsOptions.length === 1) {
                        this.changeFlat(this.flatsOptions[0]);
                    }
                },
                (err) => console.error(err)
            );

    }

    resetFlat(saveHouse, saveSection) {
        this.conf.blockFlat = {
                mod: this.conf.blockFlat.mod,
                jkName: this.conf.blockFlat.jkName,
                jkId: this.conf.blockFlat.jkId,
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
                discountType: ShareFlatDiscountType.SUM,
                article: null,
                articleId: null
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
        this.conf.blockFlat.flat = flat.flat;

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
        this.conf.blockFlat.article = flat.article;
        this.conf.blockFlat.articleId = flat.articleId;
    }


    getDiscount(): number {
        if (this.conf.blockFlat.discountType === ShareFlatDiscountType.PERCENT) {
            const discount = +this.conf.blockFlat.price * (+this.conf.blockFlat.discount / 100);
            return +discount.toFixed(2);
        }
        return +this.conf.blockFlat.discount;
    }
}
