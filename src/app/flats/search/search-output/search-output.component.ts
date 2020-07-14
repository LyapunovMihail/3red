import { IFlatWithDiscount } from '../../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FlatsDiscountService } from '../../../commons/flats-discount.service';
import { SearchService } from '../search.service';
import { FavoritesService } from '../../../favorites/favorites.service';
import { PlatformDetectService } from '../../../platform-detect.service';

@Component({
    selector: 'app-search-output',
    templateUrl: './search-output.component.html',
    styleUrls: ['./search-output.component.scss']

})

export class SearchOutputComponent implements OnInit {


    @Input() public flatsList: IFlatWithDiscount[] = [];
    @Input() public count: number;
    @Input() public showMore: boolean;
    @Output() public loadMore = new EventEmitter<boolean>();

    @ViewChild('container')
    public container: ElementRef;
    @ViewChild('result')
    public result: ElementRef;

    public isLoading = true;

    constructor(
        private platform: PlatformDetectService,
        private flatsDiscountService: FlatsDiscountService,
        private searchService: SearchService,
        public favoritesService: FavoritesService,
        private ref: ChangeDetectorRef
    ) {}

    public ngOnInit() {
        this.searchService.getOutputFlatsChanged()
            .subscribe((changes: {flats: IFlatWithDiscount[], showMore: boolean}) => {
                this.flatsList = changes.flats;
                this.flatsList.forEach((flat) => {
                    flat.discount = this.getDiscount(flat);
                    flat.inFavorite = this.inFavorite(flat);
                });
                if (changes.showMore) {
                    this.resultAnimate();
                } else {
                    this.ref.detectChanges();
                    this.container.nativeElement.style.height = this.result.nativeElement.clientHeight + 192 + 'px';
                }
            });

        this.searchService.getLoadingIndicator()
            .subscribe((item) => this.isLoading = item);
    }

    private resultAnimate() {
        if (!this.platform.isBrowser) { return; }

        this.container.nativeElement.style.height = this.container.nativeElement.clientHeight - 940 + 'px';
        this.container.nativeElement.classList.add('search-output--animate');
        this.container.nativeElement.style.height = this.container.nativeElement.clientHeight + 940 + 'px';

        setTimeout(() => {
            this.container.nativeElement.classList.remove('search-output--animate');
        }, 1500);
    }

    public flatsCount() {
        return this.count;
    }

    public getDiscount(flat): number {
        return this.flatsDiscountService.getDiscount(flat);
    }

    public inFavorite(flat): boolean {
        return this.favoritesService.inFavorite(flat);
    }

    public scrollToTop() {
        if (!this.platform.isBrowser) { return; }

        window.scrollTo(0, 0);
        // window.scrollTo(0, this.container.nativeElement.offsetTop);
    }
 }
