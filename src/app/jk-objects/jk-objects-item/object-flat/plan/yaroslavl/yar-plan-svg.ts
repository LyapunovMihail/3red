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
        svgPath: `M17.6794 192.504L163.451 376L183.799 369.661L177.127 294.261L263.856 267.904L269.861 276.579L263.856 188.5L261.521 186.165V176.49H255.85V168.149L287.206 159.808V150.8L355.922 132.117L387.945 155.805V102.424L464 82.74V68.0603V51.0453L437.648 34.6974V24.3549L428.975 19.0169L416.299 22.0195L375.937 0L249.179 26.6903L244.509 22.0195L95.7354 54.0479L99.0712 81.4055H95.7354L73.7196 60.0532L0 75.0666L17.6794 192.504Z`,
        transform: 'translate(192,19)',
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
        svgPath: `M0 289.843L12.6667 401.577L131 549L699.667 319.527L730 153.093L663.667 119.739L624.333 132.414L589.333 114.069L593 73.0443L518 36.0219L488.667 42.6926V23.014L442.667 0L346.333 24.6817V36.0219L334 39.3572V66.3736L312.333 70.3761L300.667 62.0377L287.667 65.0395V76.7132L212 97.0589L214 206.125L253 235.476L421 183.445L434 191.783L398.667 203.79L398 207.459L390.333 209.794L386 207.459L380.333 208.793L378.667 241.48L351 249.485L320.667 227.805L267.667 244.148V248.484L255 252.82L251.667 249.485L248.333 250.485V314.191L162 343.208V337.205L122.333 297.848L117 300.849L115 297.848L114 277.502L104.667 268.163L95 271.498L87.6667 261.826L0 289.843Z`,
        transform: 'translate(368,25)',
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
