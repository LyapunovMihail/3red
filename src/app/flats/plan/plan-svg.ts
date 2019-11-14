export interface IHousePlanItem {
    houseNumber: string;
    svgPath: string;
    transform: string;
    freeFlats: number;
    rooms: IRoomsMinPrices[];
}

export interface IRoomsMinPrices {
    name: number;
    minPrice: number;
}

export const PLAN_SVG = [
    {
        houseNumber: '1',
        svgPath: `M6.988 124.095L0 4.64 56.024 0l34.472 17.58 1.653 25.837 18.934 8.918v-4.312l18.7-7.667 11.69 6.088v8.708l6.066 2.744 38.242-13.257 9.934
            5.926v14.253l53.406-18.374 13.427 5.89V23.413L324.436 0l25.622 10.518 1.153 21.367 30.034-10.118 19.816
            7.834v6.696l11.298 5.232 31.221-9.644 29.293 11.532v13.195L132.64 186.729z`,
        transform: 'translate(125,486)',
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
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '2',
        svgPath: `M27.707 180.373L2.933 167.62 0 57.638 162.27 0l18.834 7.75 1.823 27.376 7.187-1.705
            1.485 28.299 7.314-1.808 20.872 8.822 25.162-8.822 24.013 11.06V86.95z`,
        transform: 'translate(592,356)',
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
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '3',
        svgPath: `M25.656 167.247L0 156.04V59.054l56.088-19 19.663 5.003 17.47-9.003 27.679 8.109v36.234l16.479-6.444 1.217-40.172
            10.54-4.227v-5.15l9.358-3.747 11.183 1.696 7.753-2.987 1.568-5.602 9.03-3.939 9.775 2.635
            9.689-3.465v-5.49L216.75 0l11.3 3.505v3.58c8.804-1.02 13.92.772 15.349 5.375v72.445L25.656 167.247z`,
        transform: 'translate(854,271)',
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
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '9',
        svgPath: `M26.06 129.677L.586 121.889 4.887 34 103.602.5l20.236 4.297-7.637 90.896z`,
        transform: 'translate(1368,110)',
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
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }
];
