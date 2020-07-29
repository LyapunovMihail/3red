export interface IHousePlanItem {
    houseNumber: string;
    svgPath: string;
    transform: string;
    freeFlats: number;
    minPrice: number;
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
        svgPath: `M17.533 401l219.913 3 3.507-30-5.51-41.5-18.535.5-.501-6h-18.535l-1.002 5.5h-32.06v-7h-20.038l-1.002 
            6-31.56 1v-7H91.172v5.5h-8.015L266 94.5l-7.514-85L241.454 4l-6.512 7.5V6l-18.034-6-14.027 17v7l-15.028 17.5 6.011 
            47-2.504 3L170.82 86l-13.024 13.5-5.01-2-9.017 10.5v8l-15.529 18.5 3.507 27-12.023 14.5-5.51-2-8.516 10.5v7.5l-8.015 
            9v13l-9.017-2-15.029 16.5-5.009-1.5-8.516 11v8.5C15.629 299.7 1.503 346.667 0 363.5L9.518 396h7.013l1.002 5z`,
        transform: 'translate(186,204)',
        freeFlats: 0,
        minPrice: 0,
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
            }, {
                name: 4,
                minPrice: 0
            }
        ],
        freeStorage: 0,
        freeParking: 0,
        storageMinPrice: 0,
        parkingMinPrice: 0
    }
];
