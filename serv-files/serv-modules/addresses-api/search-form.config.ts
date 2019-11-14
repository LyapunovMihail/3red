export const FormConfig = {
    price: {
        min: 6000000,
        max: 18000000
    },
    floor: {
        min: 2,
        max: 10
    },
    space: {
        min: 30,
        max: 100
    },
    sort: 'floor_1',
    typeList: [
        {
            name: 'квартиры',
            value: 'КВ'
        },
        {
            name: 'апартаменты',
            value: 'АП'
        }
    ],
    decorationList: [
        {
            name: 'без отделки',
            value: '00'
        },
        {
            name: 'черновая',
            value: '01'
        },
        {
            name: 'чистовая',
            value: '03'
        }
    ],
    housesList: [
        {
            name: 'Все корпуса',
            value: 'all'
        },
        {
            name: 'Корпус 1',
            value: '1'
        },
        {
            name: 'Корпус 2',
            value: '2'
        },
        {
            name: 'Корпус 3',
            value: '3'
        },
        {
            name: 'Корпус 4',
            value: '4'
        }
    ]
};
