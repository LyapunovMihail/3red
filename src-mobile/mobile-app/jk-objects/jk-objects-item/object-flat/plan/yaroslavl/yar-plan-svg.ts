export interface IHousePlanItem {
    houseNumber: string;
    svgPath: string;
    transform: string;
    freeFlats: number;
    rooms: IRoomsMinPrices[];
    minPrice: number;
}

export interface IRoomsMinPrices {
    name: number;
    minPrice: number;
}

export const PLAN_SVG = [
    {
        houseNumber: '1',
        svgPath: `M16.6981 102.969L0 45.2795L64.4547 27.1677L78.8151 33.8758L84.1585 57.354L106.2 51.6522L98.8528 15.764L158.298 0L175.998 8.38509L177 20.4596L146.943 30.5217L156.294 95.9255L123.566 108L118.557 89.5528L93.5094 74.1242L76.1434 78.8199V82.8447L16.6981 102.969Z`,
        transform: 'translate(262,98)',
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
        ]
    }, {
        houseNumber: '2',
        svgPath: `M87.364 38.6667L0 56L7.36402 168.667L23.7657 179L34.8117 175.333L87.364 153.333L105.105 159.333V74.6667L124.519 70.6667L126.192 66.3333L134.895 64.6667L139.247 66.3333L152.636 64.6667L158.326 67L160 6.33333L140.251 0L87.364 10.3333V38.6667Z`,
        transform: 'translate(523,22)',
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
        ]
    }
];
