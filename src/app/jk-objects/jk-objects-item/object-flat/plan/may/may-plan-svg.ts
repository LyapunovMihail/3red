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
        houseNumber: '11',
        svgPath: `M115.5 0L8.5 1L4 36H0.5V44L15.5 84.5H47.5V79H69V81.5L60.5 83L53.5 96L77.5 166H156.5L164 110.5L145.5 73V66.5L133 41V30.5L115.5 0Z`,
        transform: 'translate(1447,177)',
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
        ]
    }, {
        houseNumber: '12',
        svgPath: `M123 0.5L16.5 2L13 37.5L1.5 38.5L0 48L6 68H10L8.5 78.5L14 100.5L28 97.5V100.5H19L16.5 107.5L23.5 132H35.5L37 137H25L28 152C30 160.4 37.5 160.5 41 159.5H120C126.8 159.5 126.833 152.833 126 149.5L120 135.5H117.5L116.5 124.5H119L117.5 119V111L113 100.5L113.5 87.5L112.5 83H109L104.5 70H129.5L133.5 25.5L123 0.5Z`,
        transform: 'translate(1304,177)',
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
        ]
    }, {
        houseNumber: '13',
        svgPath: `M108 0H2L0 43L4.5 83.5H35.5V78H47.5V80L46 86L53 146H44.5V164.5L130.5 163C144 163 141 152 139.5 147L134 127V119.5L132 108L130.5 96L126.5 94.5L125.5 89V72.5V65.5L122.5 64V55L108 0Z`,
        transform: 'translate(1086,179)',
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
        ]
    }, {
        houseNumber: '14',
        svgPath: `M25 85.5L12 94V110.5L4 115V130.5L1.99997 132C-2.00003 139.2 2.66664 144.333 5.49997 146C18 149.5 46.8 157.6 62 162C77.2 166.4 87 160.167 90 156.5L106.5 143.5L111.5 146L127.5 130L127 119L129 117.5V109L132.5 106L144 109L182.5 81.5H197.5V25L195.5 0H140.5L95.5 28V36.5L58 58.5V61L25 81.5V85.5Z`,
        transform: 'translate(866,177)',
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
        ]
    }, {
        houseNumber: '15',
        svgPath: `M128 0H10H7.5L3.5 36L1.5 34.5L0 46L19 98.5L63 97L74.5 133H65.5L63 149.5L82.5 212.5C108 212 162.1 210.9 174.5 210.5C186.9 210.1 190.333 206.333 190.5 204.5L192 184.5L183.5 168V142L171.5 117V106.5L162 85L147 49.5V41L128 0Z`,
        transform: 'translate(1424,346)',
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
        ]
    }, {
    houseNumber: '16',
        svgPath: `M149.5 33.5L137.5 0.5L17.0001 1.5L14.5001 39.5C3.00007 39.5 -0.5 40.5 0.500073 47.5L6.50007 75H20.0001V78H10.5001L9.50007 86.5L15.5001 117H30.5001V119.5H18.5001L17.0001 125L23.0001 160.5H38.0001L39.5001 168H25.5001L28.5001 186C30.1001 197.2 42.8334 200.333 49.0001 200.5C63.3334 201.5 96.9001 203.9 116.5 205.5C136.1 207.1 140.333 201.833 140 199V183.5L134.5 165H131.5V155.5L129.5 149H133L125 125L126.5 111L125 104.5H119.5L118 98.5H144L149.5 33.5Z`,
        transform: 'translate(1263,346)',
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
        ]
    }, {
    houseNumber: '17',
        svgPath: `M0 0.5H121L125.5 38L132 41.5L135.5 66.5V75.5L136.5 77L137.5 87.5V103H131.5L132 118.5H140.5L142 130.5V137L144.5 145V152.5H135V163L137 164V170H146L146.5 181C147 201 147.5 201.5 139 201.5H38.5L37 137H44.5V122H49V91H34.5V98.5H0V0.5Z`,
        transform: 'translate(973,346)',
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
        ]
    }, {
        houseNumber: '18',
        svgPath: `M29.5 109L12 120.5L12.5 137L4.00003 143.5V160C-1.50009 165.5 -0.999718 173.721 10.5002 178C24.8335 183.333 52.8 193.9 68 199.5C83.2 205.1 93.3334 199.167 96.5 195.5L122.5 172.5L125.5 175L146.5 157V144.5L145 143.5L149 141V130L154.5 125L167 130L208.5 95L229.5 96.5V0.5H169.5L114.5 36.5V44L68.5 71.5V77.5L29.5 104V109Z`,
        transform: 'translate(713,346)',
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
        ]
    }, {
    houseNumber: '19',
        svgPath: `M260.5 236L234.5 128.5L233 121.5H227.5L146 119.5V117H144L146 132.5H151L152.5 140.5H151V143L155 157V161.5H157V167V175.5L159.5 186L166.5 217.5C168.5 224.5 169 235.5 160.5 235.5L44 233.5C31.2 233.1 27.5 226 25.5 214.5L22.5 184H39.5V176H20L11.5 121L4.5 76.5L3.5 74.5L0.5 53.5C0.499876 45 5.50012 43 11.5 43H19.5L21.5 0.5H177.5L181.5 12.5H328.5V10.5H330.5L351.5 62.5L351 75.5H352.5L372.5 132L389 183L388 190H385V197L388 203V208L395.5 226.5C400.7 238.5 394 253.5 382.5 253L291.5 250.5C273.9 249.7 265 247 260.5 236Z`,
        transform: 'translate(1238,575)',
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
        ]
    }, {
    houseNumber: '20',
        svgPath: `M337.5 0L26.5 2L23.5 43.5C14.5 43.5 9.5 50.5 9.5 57L2.5 175H17V184.5H1.5L0.5 214.5C0.500012 231 11.5 237.5 21 237.5H100C130 237.5 140.5 232.5 140.5 221.5L138 110.5H233.5V117.5H246V125H228L232 221.5C232.4 237.5 241.5 241.5 259.5 241.5L336 240.5C363.2 240.5 371.333 233.5 372 230V225L371 223.5L368 186H357V179H366.5V170H365.5L360 125V116L357 97V90L353 62.5L350.5 47L348.5 44L344.5 42L337.5 0Z`,
        transform: 'translate(811,574)',
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
        ]
    }, {
    houseNumber: '21',
        svgPath: `M110 258L269 124.5L326.5 122.5L319 168.5L320 182L324.5 185V193H318L315 206.5C308 230 313 234.935 330.5 235.5C351.167 236.167 397.9 237.5 419.5 237.5C441.1 237.5 449.5 230.167 451 226.5L453.5 187.5L451 185H437.5L438.5 177L455.5 175.5L467.5 65.5C469 47 467.5 40.5 450 40L449 0.5L291.5 1.5L288.5 12.5H205L177 30.5V40L137.5 65.5L138 74.5L134.5 78V86L126 83.5L64.5 122V130.5L10 167.5L10.5 174.5L18 177V178.5L6.99992 185.5V193L10.5 194V200.5L9.49981 201V207.5C-1.5 211 -3.50013 224.5 6.99992 229.5L53.9998 251.5C93.4998 268 88.4998 271 110 258Z`,
        transform: 'translate(273,570)',
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
        ]
    }
];
