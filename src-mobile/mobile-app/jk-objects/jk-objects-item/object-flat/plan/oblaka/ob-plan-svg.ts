export interface IPlanSvgItem {
    houseNumber: string;
    svgPath: string;
    freeFlats: number;
    minPrice: number;
    rooms: IRoomsMinPrices[];
}

export interface IRoomsMinPrices {
    name: number;
    minPrice: number;
}

export const PLAN_SVG = [
    {
        houseNumber: '1',
        svgPath: `M1191.2,899.2l1.2-1l-1.8-1l-2.8-2.5l-2,0.2v-2.5l1.8-0.8l-1.2-1.8l-3,0.2l-2.5-1l-5.5,2.2
            l-0.2,3.2l-2.2-0.5l-4.2,2.5l-1,2.5l2,2.8l-2.5,1.5l-0.2,3l2.2,3.2l2.8,2.8l4.2,1.8l-18.8,5.8l-0.5-2.5l1.5-0.8l0.2-1.2l-1-1.2
            l-1.2-0.5l1.2-2.2l1.8-2.8l-0.8-2l-3.2-3.2l-2.5,1.8l-3.8,0.5l-2.8-2.2l-2.5-1l-1.8-1l-2.2-2.8l-3.8-0.2l-2.2-2.5l1-2.5l1.8-1.5
            l-1.2-3.8l-4-3l-6.2,0.2l2.2-3.5l-3-0.2l-2.8,1.5l-2.5-0.8l-4-1l-2.5-2.8l-4,0.8l0.2,4l-1.8,0.5l0.2,1.5l3.8,1c0,0-1.2,1.8,0,1.8
            s4,1,4,1l-3,2.2l-4.5,0.8l-1-2.5l-2.8-2.2l-1.5,2.2l-4.2,2.2l-3-1l-2,2.5l-1.8,4.2l2,2.8l-2.5,3.2l-1.8,1.5l3.5,3.5l0.5,4.5
            l-3.2,2.8l-3.8,2.2l-0.8,3.5l4,3.2l5.5,1.2l-2.5,2.5l-7.2-4.2c0,0-4,2.2-4.2,3s-4.5,5-4.5,5l-1.8,2.5l3.8,2.2l2.2,1.8l-7.8,1l-1,2.2
            L989.2,966l-18-11.2l-21.5,5L866,986.5l1,12.8l-6,1.8l-4.5-4.5l0.2-4l1.8-2.8l1-3.5l-1-0.8l-0.8-1.8L854,984h-3.2l-1-3.5l2-3
            l-2.2-2.2l-1.5-4.5l-0.5-2.5l2.2-3.5l-2-4l-1.8-3.2l-2.8-2l-3-3.8l-3.8,0.2v2.5l1.2,1.8l-1,2.5l-2,1.2l-2-1.5l-1.2,1.5l-2.8,0.2
            l-2.8-1l1-3.2l-0.8-2.5l-2.5-1l-3.2,1.2l-4.8,0.8l-3.5,1.5l-1.8,1.5l-1.8,2.8L808,963l1,2.2l-2.5,2l-1.5,2.2l-3.2-2l-2.5-2.2l1.2-2
            l-2.5-2.5l-1.5-2L794,959l-0.8-2.2l-3.8-1.2H786l-3.8-0.5l-3.8,2l-5.2,2.8l-10.2,3.5l-2.8,1.8l-2.5,3.8l-0.2,3.8l-5,5l-3.5,4.2
            l1.8,2l-0.2,2.8l2.5,3l1.8,2.5l-5,0.8l-2,2l0.5,7c0,0-4,5-3.2,5s2.8,2.5,2,2.8s2,4,2,4l3-1l-0.8,3.8l0.8,2l-1.5,4.5L670,969.2
            l10.8-3.2L642,320l100-16.2l8.5-3.8h10l0.5-26l66.8-10.2l40.2,11.8l0.2,3.8l13.2,0.8l11-6l16.5,2l9.8-6l16.5,2.2l23.2-4.2l8.8-5.5
            l13.5,1.5l7.2-3.8l18-0.2l17.2-3l-0.2-24.8l59.5-9.2l43.8,11.5l-0.2,6.5l9-5l13.8,0.8l24-4.8l19.5-1.2l8-6l12,1.8l7.5-3.5l13.2,0.8
            l17.2-3.8l0.8-24l54-8.5l44.5,9.5l-0.5,6.5l5.5,0.8l29.8-5.5l20.8,4.8l15,0.5l3.2,2.8l41,11l11-0.5l3.5,4.8h14.5l2.8,3.8l40.5,9.8
            l14.5,0.2l2.5,3.5l27.8,8l-8.8,315.8h-1.3l0.2-22l-42.3-14.3l-36.8,9.5l-9.5-2.3l-95.7,22.9l-2.8,273.2h-2.8v-1.8l-2.8-0.8l-1.8-2.2
            l-1.5-2.5h-3v-2l3-1.2l1-5.5l-4-4.5l-5-1.2l-4.2,2l-1.5-3l2.2-1.5l-2.2-2.2l-6.5,2l-4,1.2V804l-3-2.8l-7-1.5l-2.8,5.8l2,4.5l4.8,1
            l0.2,1.2v1.5l-4.8,2.2l-4,0.5v-4l-5-3l-5.5,0.8l2,1.8h3l0.8,3.2l-5.8-1.5h-2.5l-1.8,2.8v2.8l-3.5-3.2l-2.8,2.5l2.2,4l6.5,2.8
            l-3.2,2.5l-3.5-1.2l-2,4.8l2.5,3l-2.5,7.8l-2.5,5.5l6,3.8l1.8,7.2l-0.2,6.8l-4.2-2l-2,2l-1.2-3.5l2-4.2l-5.2-3.8l-4.2,2.2l2.8,5.2
            l-4,0.5c0,0,0.5,1.2,0,2.2s1.2,7.5,1.2,7.5h-4.2v-3.2l-3,3.2h-2.5V866l-1.2-1v-1.2h2.5l2.2,1.5l-1-5.2l-0.5-2.8l-3.2-1.8l-3.8,2.5
            l-2.5,1.8l-3.2-0.2l-3.2-0.5v-1.5l-3.8,0.2v-1.2l1.8-2.8l3.5-1.2h3.5l0.2-3.8l-2-4.8l-3,1.5l-0.8,3l-1.5-1.5l-3.5-1l-2.2,1l-3-3
            l-5.5-0.8l-2.2,0.5v3l-2.2,3.2v2.5l-5,0.5l-2.2,1.5v3l3.5,2.2l-1,3.8v4.8l-2.5,3.2h-4h-2V867l-4.2-1.5l-4.5-1.5l-5.8,1.8l-2.8,1.2
            l2.2,2.8l-2.2,4.8h-2.2v-3l-3.5,0.2l-3,2.8v5.2l-1.8,1.8l1.8,3.8v2.8h-4l-2.2-1.8v3.8l1.8,2.5l1,4.8l-1.2,2.8l1.2,1.8l-0.2,1.2
            l-23.2,6.2v-4.8l-2.5-3.2`,
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
            }, // {
            //     name: 4,
            //     minPrice: 0
            // }
        ]
    }, {
        houseNumber: '2',
        svgPath: `M1775.5,558.8l-6.5,1.2l-41-13.2l-77,19.8l-1.5,27l-8.8,2l-0.5-9l-67.8-23.5h-1.3l0.2-22
            l-42.3-14.3l-36.8,9.5l-9.5-2.3l-95.7,22.9l-2.8,273.2h-0.2l1.4,1.2l3.8-0.2l-0.2,5l5-1.2l1.5-2.2h3.5l0.2,5.8l-2.8,2.5l-0.2,6.5
            l1.2,4l4.2,1.2l3.5,4.2l-1,5.5l2,4.8l4,2.2l2.8,4.8l-1.2,7.8l-2.8,7.8l-4.2,1.8l-5-1.8l-2.5,5.5l1.1,9l-1.6,0.9l0.2,1.9l-2,2.8
            l-1.5-1.2l-0.8,3l-2.8,0.2l-2.8-0.2l-3.2,4.2l-3.8-2.8l-6-5l-2.2,1.8l-2,7.5l-2,12.5l56.5,30.5l6-1.2l0.5-5.2l-0.5-4.8l1.5-1.5
            l-0.2-4l-1-3.5l1.2-4.8l-2.2-3.8l1.8-2l0.2-3.5l1.8-1.5l0.2-4.8l-1.2-3l1.8-4l2.2-2.8l-0.8-1.2l1.8-2.8l-0.5-3.8l1.2-3l2.2-4
            l3.5,1.2l3.5,1.2l0.2,4.2l3,7.5l-2.5,7.2l4.2-2.5l3,1.5l-3,5.2l2.5-1l1.5,1.8l-3.8,3l2.8,2l-2.2,2.2l2.2,1.2l-0.8,5.2
            c0,0-2.5,0.5-3.2,0.5s0.8,3.2,0.8,3.2l1.5,8.2l-1,6l3.5,2.5l4,0.5l16.5,7l-2.2,3.8l0.8,4l1.8,7.5l42.5,20.5l3-1.8l5-2l6.2,6.5
            l5.2,2.5l1.5-5.5l-4.8-2.5l0.2-5l0.5-6l5.8,1.8l2.2-2.5l2-0.5l1.2-5l5,2l4.5,0.8l3.8,2.5l-1.2,97.5l24,13.5l1-1l-3.5-2.5l-0.5-1.5
            l2.2-1.8l-2-7l0.5-4.5l1.2-5l1.8-1v-6.5l1.5,0.2l1.2-3.8l1-3.2l1.8-5l3.8-1.2l4,5l0.5,5l2.5-3l0.5,4.2l-1.5,3.5l3-0.2l0.8,2.2
            l-2,3.2l1,5.2l-0.2,6.5l1,11.2l1,9.8l7.5,4.8l2.2,1l1.2-1.2l-0.2-5.8l2.2-2.5l3.8-0.2l0.8,2.2l-2.8,5.5l6.2,5l2-2.5l-5-5l2.5-5.2
            l0.5-5l1.2-2.8l2.5,1l2.8-2.2l1.2,0.8l6.2,2.5l2.5-2.2l0.8,1.8l4.5,0.8l2,4l2.2,1.5l-1,3.8l2.5,4l6.8-0.8l3.5,2l-2.2,3.5l-3-0.2
            l-1.8,3.2l2.8,2.5l4,1l3.2,1.5h6.2l1.5,4l4-2l-1.5-6.5l8.5-6.5l11.8-4.2l2.8-4.2h-3.8l-4,2.5l-6,0.5l-5-1.5l-4.8-5l1.5-4l3.8-2.8
            l4,0.2l2.5-2.8l-2-1.5l2.5-4.8l2.8,4.5l1.5,4.2l4-1l1.8-3.5l-3.2-1.2l-0.5-2.8l2.5-3.5l2.2,1l3-1.8l0.2-2.2l1.2-3l4.5-1l6,1.5
            l2.8,4.5l0.5,4.2l2.5,0.2l4,2.2l-1.8,3.5l-0.2,4.5l0.2,4l3-2l2.5-3.2l3.2,2l-1,3.8l3.8,2l0.2-2.5l-0.5-3.5l4,0.5l6.2-1l2.5,9.8l-3,3
            l-3.2,4.2l3.8,1.8l3.2,8.2l73.8-27v-4.8l-1.5-2l-1.2,3.8l-7,0.8l-2.2-2.2l-2.2,2l2.5,4c0,0-5.5,2-6.2,1.8s-5.8-0.5-5.8-0.5l-3.2-5
            l0.5-3.8l1.8-4.5l-5.2-1.2l-2-6.5l4.8-4l1.8-4.8l-6.2-3.5l0.2-5.5l6.2,1l3.5-5l0.5-7.5l-4.8-3.5c0,0-3.2,0.5-5.5,0.5
            s-0.8-2.2-0.8-2.2s-5-1.8-6.2-1.8s0.8-3.5,0.8-3.5l1.2-4l3.5,1.5l11.2-3l5.5-0.8l3.2,0.8v-3l7.5-3l5-1l2.8-3.8l-5.5,2.5l-5.5-3
            l-2.8-5l0.2-7l3.2-1l3.2,3.5l7,0.5l5.2-1l-0.5-3.8l-3-2.8l-1.2,3.8l-2.8,1.2l-4-5l-4.8,1V999l-5-5.5l-2.8-4.8l2.2-3.5l2.2-3.2
            l1.5,1.5l1.8,3.5l3.5-1l0.8-2.2l-3.8-3l-1.2-2.5l2.2-2.5l1.5-2.8l3.5,0.8l-2,2.8l1.2,1.2l3.2,7l3.8-0.8l-3.2-5.2l2.8-2l1.2-1.2
            l-2.5-2.5l1.8-3.5v-3l5.5-0.5l1.2,1.8l1.8-2l3.8-1.2l2.5-0.2l2.5,1.5l1.5,4.2l4.2-0.5l-0.5,3.5l2.8,1.5l-0.2,5.2h2l0.8,3.8l2.2,2.8
            l1.5,5.2l4.5,1.2l0.8-2.8l-1.8-1.8h3.5l2,4.5l1-2.5l1.2-2.2l2-0.2v3l-2,2.8l-1.2,3.2l2,3.5l1.5,6l1.8,4l-2.2,3.5l-6.2-1.8l-3-1.8
            l1.2,2.5l3,2.5l0.5,3l7-1.8l1.2-1.2l0.2-3l2.5-2.5l2.8-1.2l26.5-408.2L1775.5,558.8z`,
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
            }, // {
            //     name: 4,
            //     minPrice: 0
            // }
        ]
    }
];
