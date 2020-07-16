import { Share, ShareBodyBlock, ShareFlat, ShareFlatDiscountType } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FlatsDiscountService {

    public shareFLats: ShareFlat[] = [];

    constructor(
        private http: HttpClient
    ) {}

    public getShares() {
        this.http.get<Share[]>(`/api/shares/list`)
            .subscribe((data: Share[]) => {
                data.forEach((share: Share) => {
                    share.body.forEach((block: ShareBodyBlock) => {
                        if (block.blockType === 'flats') {
                            this.shareFLats = [...this.shareFLats, block.blockFlat];
                        }
                    });
                });
            }, (err) => {
                console.log(err);
            });
    }

    public getDiscount(flat): number {
        const shareFlat = this.shareFLats.find((sFlat) => +sFlat.number === flat.flat);

        if (shareFlat) {
            if (shareFlat.discountType === ShareFlatDiscountType.PERCENT) {
                const discount = +shareFlat.price * (+shareFlat.discount / 100);
                return +discount.toFixed(2);
            }
            return +shareFlat.discount;
        }
        return null;
    }
}
