export const placement = [
    {
        title: 'Фитнес-центр (900 м)',
        mod: 'sport'
    },
    {
        title: 'Пляж (300 м)',
        mod: 'beach'
    },
    {
        title: 'Остановка (200 м)',
        mod: 'stop'
    },
    {
        title: 'Круглосуточный магазин (100 м)',
        mod: 'market'
    },
    {
        title: 'Торговый центр (900 м)',
        mod: 'supermarket'
    },
];

// export interface IHousePlanItem {
//     houseNumber: string;
//     svgPath: string;
//     transform: string;
//     freeFlats: number;
//     rooms: IRoomsMinPrices[];
// }

export const mockHouse = [
    {
        houseNumber: '2',
        freeFlats: '245',
        rooms: [
            {
                name: '0',
                minPrice: '2,4'
            },
            {
                name: '1',
                minPrice: '3,4'
            },
            {
                name: '2',
                minPrice: '4,4'
            },
            {
                name: '3',
                minPrice: '5,4'
            }
        ]
    },
    {
        houseNumber: '3',
        freeFlats: '545',
        rooms: [
            {
                name: '0',
                minPrice: '2,4'
            },
            {
                name: '1',
                minPrice: '3,4'
            },
            {
                name: '2',
                minPrice: '4,4'
            },
            {
                name: '3',
                minPrice: '7,4'
            }
        ]
    },
    {
        houseNumber: '4',
        freeFlats: '367',
        rooms: [
            {
                name: '0',
                minPrice: '2,4'
            },
            {
                name: '1',
                minPrice: '3,4'
            },
            {
                name: '2',
                minPrice: '4,4'
            },
            {
                name: '3',
                minPrice: '5,4'
            }
        ]
    }
];
