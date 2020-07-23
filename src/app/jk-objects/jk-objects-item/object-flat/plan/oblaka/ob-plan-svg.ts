export interface IPlanSvgItem {
    houseNumber: string;
    svgPath: string;
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
        svgPath: `M401 2268.5L420.521 2593 471.575 2630 504.61 2618 504.61 2608.5 514.121 2608.5 514.121 2601 566.176 2586
            575.186 2593 762.385 2534.5 771.395 2538 773.397 2387 818.946 2375 828.956 2377.5 843.472 2373 865.996 2380.5 870
            2233.5 771.395 2207.5 755.878 2210.5 735.857 2203 704.824 2209 704.824 2218 643.759 2228.5 621.735 2220 591.203
            2226.5 591.203 2237.5 514.621 2248.5 493.599 2241.5 459.562 2248.5 459.562 2258.5z`,
        transform: 'translate(-80,-2148)',
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
            }, // {
            //     name: 4,
            //     minPrice: 0
            // }
        ]
    }, {
        houseNumber: '2',
        svgPath: `M1015.469 2637L1032 2409.5 966.877 2389 962.869 2389 943.332 2382.5 903.256 2394 903.256 2406 896.744
            2408 896.744 2401.5 864.683 2389 864.683 2380.5 841.639 2372 828.114 2378 819.097 2374 771.507 2389 768
            2572 857.67 2620 857.67 2650.5 925.799 2682z`,
        transform: 'translate(-80,-2148)',
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
            }, // {
            //     name: 4,
            //     minPrice: 0
            // }
        ]
    }
];
