export const FormConfig = {
    price: {
        min: 1500000,
        max: 15000000
    },
    floor: {
        min: 1,
        max: 50
    },
    space: {
        min: 20,
        max: 200
    },
    sort: 'floor_1',
    typeList: [
        {
            name: 'Квартиры',
            value: 'КВ'
        },
        {
            name: 'Апартаменты',
            value: 'АП'
        }
    ],
    decorationList: [
        {
            name: 'Без отделки',
            value: '00'
        },
        {
            name: 'WhiteBox',
            value: '01'
        },
        {
            name: 'Чистовая',
            value: '03'
        }
    ],
    housesList: [
        {
            name: 'Тип дома 1А',
            value: '1a'
        },
        {
            name: 'Тип дома 2А',
            value: '2a'
        },
        {
            name: 'Тип дома 1Б',
            value: '1b'
        },
        {
            name: 'Тип дома 2Б',
            value: '2b'
        }
    ]

};
