

export let destination = [55.65618531858043, 37.92175475135617]; // Вот сюда сходятся все пути от контрольных точек

export let markersConfig = [
    /* {
        coords: [55.715760, 37.816980],
        size: [30, 46],
        offset: [-15, -46],
        zIndex: 0,
        class: 'marker-content marker-content_active',
        content: 1,
        tooltip: '',
        lineCoords : [
            [55.716199, 37.816873],
            [55.713813, 37.824018],
            [55.710175, 37.834825],
            [55.707497, 37.842641],
            [55.705493, 37.848483],
            [55.703703, 37.853627],
            [55.702486, 37.856508],
            [55.700901, 37.859813],
            [55.699608, 37.862336],
            [55.698272, 37.864975],
            [55.696439, 37.868617],
            [55.694910, 37.871639],
            [55.693556, 37.874225],
            [55.691761, 37.877582],
            [55.690893, 37.879237],
            [55.689667, 37.882622],
            [55.689113, 37.883952],
            [55.688219, 37.885653],
            [55.686006, 37.889392],
            [55.684884, 37.892078],
            [55.683439, 37.894915],
            [55.682578, 37.896675]
        ],
        text: 'На электричке от ст. м. Выхино, 10 минут',
        type: 'polyline'
    }, */
    {
        coords: [55.715153, 37.804425], // Координаты отметки местоположения маркера
        size: [30, 46],
        offset: [0, -20],
        zIndex: 0,
        class: 'marker-content marker-content__auto',
        content: 2,
        tooltip: '',
        route: {
            origin: [[55.715153, 37.804425]], // Начало линии откуда простраивается путь
            color: 'rgba(90,49,197,.6)',
            activeColor: 'rgb(90,49,197)',
            strokeStyle: '1 0' // первая цифра - длина штриха, вторая - длина пробела
        },
        text: 'МКАД 8-й км через Октябрьский пр. (8 км, 20 мин)',
        aside: {
            text: '1. МКАД 8-й км через Октябрьский пр.',
            hint: '(8 км, 20 мин)',
            subText: [
                {
                    text: '',
                    hint: ''
                }
            ]
        },
        type: 'auto'
    }, {
        coords: [55.698452, 37.801486],
        size: [30, 46],
        offset: [0, -20],
        zIndex: 0,
        class: 'marker-content marker-content__auto',
        content: 3,
        tooltip: '',
        route: {
            origin: [[55.698452, 37.801486]],
            color: 'rgba(90,49,197,.6)',
            activeColor: 'rgb(90,49,197)',
            strokeStyle: '1 0'
        },
        text: 'МКАД 10-й км через Новорязанское ш. (13 км, 25 мин)',
        aside: {
            text: '2. МКАД 10-й км через Новорязанское ш.',
            hint: '(13 км, 25 мин)',
            subText: [
                {
                    text: '',
                    hint: ''
                }
            ]
        },
        type: 'auto'
    }, {
        coords: [55.668612, 37.923497],
        size: [30, 46],
        offset: [0, -16],
        zIndex: 0,
        class: 'marker-content marker-content__railway',
        content: 4,
        tooltip: '',
        route: {
            origin: [[55.668612, 37.923497]],
            color: 'rgba(205,31,38,.6)',
            activeColor: 'rgb(205,31,38)',
            strokeStyle: '1 2'
        },
        text: 'ж/д ст. Панки (пешком 1,9 км, 20 мин)',
        aside: {
            text: '1. ж/д ст. Панки',
            hint: '(1,9 км, 20 мин)',
            subText: [
                {
                    text: 'До Казанского вокзала',
                    hint: '(38 мин)'
                },
                {
                    text: 'До м. Выхино',
                    hint: '(12 мин)'
                }
            ]
        },
        type: 'railway'
    }, {
        coords: [55.655328, 37.954140],
        size: [30, 46],
        offset: [0, -16],
        zIndex: 0,
        class: 'marker-content marker-content__railway',
        content: 5,
        tooltip: '',
        route: {
            origin: [[55.655328, 37.954140]],
            color: 'rgba(205,31,38,.6)',
            activeColor: 'rgb(205,31,38)',
            strokeStyle: '1 2'
        },
        text: 'ж/д ст. Томилино (пешком 2,4 км, 25 мин)',
        aside: {
            text: '2. ж/д ст. Томилино',
            hint: '(2,4 км, 25 мин)',
            subText: [
                {
                    text: 'До Казанского вокзала',
                    hint: '(40 мин)'
                },
                {
                    text: 'До м.Выхино',
                    hint: '(14 мин)'
                }
            ]
        },
        type: 'railway'
    }, {
        coords: [55.673638, 37.861333],
        size: [30, 46],
        offset: [0, -16],
        zIndex: 0,
        class: 'marker-content marker-content__metro',
        content: 6,
        tooltip: '',
        route: {
            origin: [[55.673638, 37.861333]],
            color: 'rgba(255,0,19,.6)',
            activeColor: 'rgb(255,0,19)',
            strokeStyle: '1 0'
        },
        text: 'м. Котельники (на автобусе 9 км, 15 мин)',
        aside: {
            text: '1. м. Котельники',
            hint: '(9 км, 15 мин)',
            subText: [
                {
                    text: 'Маршрутки 13, 44, 45',
                    hint: '(15 мин)'
                }
            ]
        },
        type: 'metro'
    }, {
        coords: [55.700874, 37.852222],
        size: [30, 46],
        offset: [0, -16],
        zIndex: 0,
        class: 'marker-content marker-content__metro',
        content: 7,
        tooltip: '',
        route: {
            origin: [[55.700874, 37.852222]],
            color: 'rgba(255,0,19,.6)',
            activeColor: 'rgb(255,0,19)',
            strokeStyle: '1 0'
        },
        text: 'м. Лермонтовский проспект (на автобусе 10 км, 15 мин)',
        aside: {
            text: '2. м. Лермонтовский проспект',
            hint: '(10 км, 16 мин)',
            subText: [
                {
                    text: 'Маршрутки 50к, 393к, 534к, 546к',
                    hint: '(16 мин)'
                },
                {
                    text: 'Автобусы 323, 346, 463',
                    hint: '(16 мин)'
                }
            ]
        },
        type: 'metro'
    }, {
        coords: [55.703966, 37.925754],
        size: [30, 46],
        offset: [0, -16],
        zIndex: 0,
        class: 'marker-content marker-content__metro',
        content: 8,
        tooltip: '',
        route: {
            origin: [[55.703966, 37.925754]],
            color: 'rgba(255,0,19,.6)',
            activeColor: 'rgb(255,0,19)',
            strokeStyle: '1 0'
        },
        text: 'м. Некрасовка (на маршрутке 10 км, 20 мин)',
        aside: {
            text: '3. м. Некрасовка',
            hint: '(10 км, 20 мин)',
            subText: [
                {
                    text: 'Маршрутки 1149, 1230к, пересадка: автобусы 22, 25, маршрутки 23, 32, 33к, 75к',
                    hint: '(20 мин)'
                }
            ]
        },
        type: 'metro'
    }, {
        coords: [55.656355158866056, 37.9214221574383],
        size: [50, 74],
        offset: [-20, -20],
        zIndex: 0,
        class: 'marker-content marker-content__main-marker',
        content: 9,
        tooltip: '',
        title: 'ЖК Новотомилино',
        text: 'Люберцы городской округ, Томилино пгт',
        type: 'main'
    }
];
