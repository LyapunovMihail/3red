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
        svgPath: `M16.6981 102.969L0 45.2795L64.4547 27.1677L78.8151 33.8758L84.1585 57.354L106.2 51.6522L98.8528 15.764L158.298 0L175.998 8.38509L177 20.4596L146.943 30.5217L156.294 95.9255L123.566 108L118.557 89.5528L93.5094 74.1242L76.1434 78.8199V82.8447L16.6981 102.969Z`,
        transform: 'translate(262,98)',
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
        svgPath: `M87.364 38.6667L0 56L7.36402 168.667L23.7657 179L34.8117 175.333L87.364 153.333L105.105 159.333V74.6667L124.519 70.6667L126.192 66.3333L134.895 64.6667L139.247 66.3333L152.636 64.6667L158.326 67L160 6.33333L140.251 0L87.364 10.3333V38.6667Z`,
        transform: 'translate(523,22)',
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
        svgPath: `M62.9184 77.9038L0 98.8779L45.6075 249.692L70.2422 270L179.767 214.735L169.447 138.163L239.689 110.197L257 117.854L246.014 10.3206L219.715 0L192.75 9.32183L185.093 5.32676L173.109 9.32183V12.984L133.494 25.635L142.815 90.8878L109.192 103.206L103.865 84.2293L86.8873 74.2417L79.5635 69.5808L62.9184 74.2417V77.9038Z`,
        transform: 'translate(276,103)',
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
        houseNumber: '4',
        svgPath: `M19 21L0 25.3333V109.333L16.3333 117.667V161.333L33.6667 169V151.667L44 145.333L48.6667 63.6667L109 47.3333L131 59.6667L133 6.33333L109 0L98 2L94 0L85.6667 2V4.66667L72.6667 9.33333V42.3333H71V25.3333L46.3333 15.3333L33.6667 17L29.3333 15.3333L20.3333 17L19 21Z`,
        transform: 'translate(629,72)',
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
        houseNumber: '5',
        svgPath: `M59.1973 243L75.5853 232.667L70.5686 173.667L200 101.667L199.331 12.3333L163.545 0L113.712 21.3333L115.385 62L109.03 66.6667V54.6667L70.5686 37.3333L0 65.3333L23.4114 217.667L59.1973 243Z`,
        transform: 'translate(445,176)',
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
        houseNumber: '6',
        svgPath: `M187 8L174.333 93.6667L157.333 100.333L146.333 164.667L109.333 183L112.667 130.667L70.3333 115.667L33.6667 134L29 132.333L17 137.333V141.667L0 149.333L4.66667 68.3333L64.6667 52.3333L85.3333 63.6667V80L95 76.3333L100 16.6667L161.667 0L187 8Z`,
        transform: 'translate(673,68)',
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
        houseNumber: '7',
        svgPath: `M20.6176 334.287L58.3028 365L253.379 202.086L272 15.1341L230.325 0L193.083 17.8056L186.876 16.0252L176.235 21.3666V24.9276L147.861 39.6166V83.6836L0 165.818L20.6176 334.287Z`,
        transform: 'translate(515,184)',
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
        houseNumber: '8',
        svgPath: `M28.9442 201L0 184.694L23.9538 41.5977L67.8692 24.6258L94.8173 34.2765L97.1461 16.3063L133.742 0L173 12.6457L132.079 151.748L28.9442 201Z`,
        transform: 'translate(807,127)',
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
