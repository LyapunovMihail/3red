export interface IHousePlanItem {
    houseNumber: string;
    svgPath: string;
    transform: string;
    freeFlats: number;
    rooms: IRoomsMinPrices[];
    freeStorage: number;
    freeParking: number;
    storageMinPrice: number;
    parkingMinPrice: number;
}

export interface IRoomsMinPrices {
    name: number;
    minPrice: number;
}

export const PLAN_SVG = [
    {
        houseNumber: '1',
        svgPath: `M125.667 481.972L219.333 526L262 488.977L268 494.313L270 492.979L269 475.635L316.333 439.278V433.275L321.667 435.609L385.333 384.243L389.333 385.578L393.667 381.242L392.333 371.902L408.667 358.894V347.887L414.333 343.551L425 348.888L488.667 300.524L495.333 302.859L523.333 280.511L531 283.847L539.667 275.174L575 290.517L578.667 287.182L619.333 303.859L625.333 299.19L640 305.527V309.529L652.333 314.199V322.538L645.667 329.876L708.333 356.559L714.333 349.888L820 391.581L836.667 373.237L849 378.907L852.667 373.237L855.333 358.561L864 349.888L902 146.093L899.333 145.425V138.421H896.333V135.086L797.667 103.732V99.0628L757.333 86.7216L753 90.3906L641.667 54.3678V44.3614L598.667 31.3532V18.345L597.667 16.3437L559.333 4.33608L558 6.33735L538.667 0L502.333 22.681L496.333 20.3462L469.333 36.6899V40.6925L468 41.6931V43.6944L431.667 65.7083V70.7115L410.667 85.3874L404 81.7185L371.667 102.398L350.333 94.0596L329.333 107.735L322 104.399L289.333 123.745V129.749L273 140.089V144.758L270.667 147.093L272 162.103L217 196.124L208 191.788L176.333 211.467L106 181.115L102.333 183.45L96.3333 180.781L2.33333 236.15L3.66667 243.488L0 245.822L42.3333 444.949L121 484.974L125.667 481.972Z`,
        transform: 'translate(142, 38)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }
        ],
        freeStorage: 0,
        freeParking: 0,
        storageMinPrice: 0,
        parkingMinPrice: 0
    }
];
