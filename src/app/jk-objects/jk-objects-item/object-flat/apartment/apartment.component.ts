import { FlatsDiscountService } from '../../../../commons/flats-discount.service';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { FavoritesService } from '../../../../favorites/favorites.service';
// declare let chWidget: any; // переменная для работы с чейзером

@Component({
    selector: 'app-flats-apartment-modal',
    templateUrl: './apartment.component.html',
    styleUrls: ['./apartment.component.scss', '../object-flats.component.scss']
})

export class ApartmentComponent implements OnInit {

    public isCreditFormOpen = false;
    public isReserveFormOpen = false;
    public isFormConfirmOpen = false;
    public flatData: IFlatWithDiscount;
    public pdfLink: string;
    // public chWidget = chWidget; // переменная для работы с чейзером

    @Input() public jk: IObjectSnippet;
    @Input() public showApartmentWindow = false;
    @Input() public flatIndex: number;
    @Input() public flatsList: IFlatWithDiscount[];
    @Output() public close: EventEmitter<boolean> = new EventEmitter();

    constructor(
        public router: Router,
        private flatsDiscountService: FlatsDiscountService,
        private favoritesService: FavoritesService
    ) {}

    public ngOnInit() {
        this.flatData = this.flatsList[this.flatIndex];
        this.flatData.discount = this.getDiscount(this.flatData);
        this.flatData.jkName = this.jk.name;
        this.pdfLink = `/api/pdf?id=${this.flatData._id}`;
    }

    public prevFlat() {
        this.flatData = this.flatsList[--this.flatIndex];
        this.flatData.discount = this.getDiscount(this.flatData);
    }

    public nextFlat() {
        this.flatData = this.flatsList[++this.flatIndex];
        this.flatData.discount = this.getDiscount(this.flatData);
    }

    public getDiscount(flat): number {
        return this.flatsDiscountService.getDiscount(flat);
    }

    public minCredit(price) {
        let minPrice = (price / 100 * 5);
        if (this.flatData.discount) {
            minPrice = (price - this.flatData.discount) / 100 * 5;
        }
        return minPrice;
    }

    public setFavorite(): void {
        this.flatData.inFavorite = !this.flatData.inFavorite;
        this.favoritesService.setFavorite(this.flatData);
    }

}
