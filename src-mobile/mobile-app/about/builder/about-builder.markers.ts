
export interface IBuilderMarker {
    title: string;
    description: string;
    link: string;
    logo: string;
    image: string;
    mod: string;
    empty: boolean;
}

export interface IAboutProject {
    title: string;
    subtitle: string;
}

export interface IProjectSnippet {
    link: string;
    city: string;
    distance: string;
    addDistance: boolean;
    title: string;
    subtitle: string;
    background: string;
}

export let BUILDER_MARKERS: IBuilderMarker[] = [
    {
        title: 'ЖК «Облака»',
        description: 'Жилой комплекс комфорт-класса в<br>г. Люберецы',
        link: 'https://oblakadom.ru',
        logo: '/assets/img/about/builder/oblaka-logo.svg',
        image: '/assets/img/about/builder/oblaka-dom.jpg',
        mod: 'oblaka',
        empty: false
    }, {
        title: 'ЖК «Новокрасково»',
        description: 'Жилой комплекс на берегу озера в Люберецком районе',
        link: 'https://novokraskovo.ru/',
        logo: '/assets/img/about/builder/novo-logo.svg',
        image: '/assets/img/about/builder/novokraskogo-dom.jpg',
        mod: 'novo',
        empty: false
    }, {
        title: 'ЖК «Видный берег»',
        description: 'Жилой комплекс комфорт-класса на живописной окраине города Видное',
        link: 'http://vbdom.ru/',
        logo: '/assets/img/about/builder/bereg-logo.svg',
        image: '/assets/img/about/builder/vb-dom.jpg',
        mod: 'vb',
        empty: false
    }, {
        title: 'ЖК «Май»',
        description: 'Уютные кварталы в ландшафтном парке заповедника Горки Ленинские',
        link: 'http://gorodmay.ru/',
        logo: '/assets/img/about/builder/may-logo.svg',
        image: '/assets/img/about/builder/may-dom.jpg',
        mod: 'may',
        empty: false
    }, {
        title: 'Дом на Барвихинской',
        description: 'Жилой дом бизнес-класса с подземной парковкой в Западном округе Москвы',
        link: '/',
        logo: '/assets/img/about/builder/barviha-logo.svg',
        image: '/assets/img/about/builder/barvihinskaya-dom.jpg',
        mod: 'barviha',
        empty: false
    },
    {
        title: 'ЖК «Академический»',
        description: '',
        link: '',
        logo: '',
        image: '/assets/img/about/builder/academicheskaya-dom.jpg',
        mod: 'academicheskaya',
        empty: false
    },
    {
        title: 'ЖК «Битцевские холмы»',
        description: '',
        link: '',
        logo: '',
        image: '/assets/img/about/builder/bh-dom.jpg',
        mod: 'bh',
        empty: false
    }
];

export let ABOUT_PROJECT: IAboutProject[] = [
    {
        title: 'Общая площадь ЖК',
        subtitle: '115 825 м²'
    }, {
        title: 'Количество мест в школе №19',
        subtitle: '550'
    }, {
        title: 'Общая площадь квартир',
        subtitle: '78 873 м²'
    }, {
        title: 'Окончание строительства 1 очереди',
        subtitle: '2020 г.'
    }, {
        title: 'Количество квартир',
        subtitle: '2147'
    }, {
        title: 'Окончание строительства 2 очереди',
        subtitle: '2021 г.'
    }, {
        title: 'Площадь нежилых помещений',
        subtitle: '7 403 м²'
    }
];

export let PROJECT_SNIPPET: IProjectSnippet[] = [
    {
        link: 'https://oblakadom.ru',
        city: 'г. Люберцы',
        distance: '5 км от МКАД',
        addDistance: true,
        title: 'ЖК Облака',
        subtitle: 'Квартиры от 2,3 млн. руб.',
        background: '/assets/img/about/builder/oblak-dom.jpg'
    }, {
        link: 'https://novokraskovo.ru/',
        city: 'Люберецкий р-н, пос. Красково',
        distance: '13 км от МКАД',
        addDistance: true,
        title: 'ЖК Новокрасково',
        subtitle: 'Квартиры от 2,2 млн. руб.',
        background: '/assets/img/about/builder/novokraskogo-dom.jpg'
    }, {
        link: 'https://barvihadom.ru/',
        city: 'г. Москва,',
        distance: 'Барвихинская улица, вл. 6',
        addDistance: true,
        title: 'Дом на Барвихинской',
        subtitle: 'Квартиры от 6,3 млн. руб.',
        background: '/assets/img/about/builder/barvihinskaya-dom.jpg'
    }, {
        link: '#',
        city: 'г. Видное',
        distance: '7,5 км от МКАД',
        addDistance: true,
        title: 'Видный Берег 2',
        subtitle: 'Скоро в продаже',
        background: '/assets/img/about/builder/vb-2-dom.jpg'
    }, {
        link: 'https://residence.gorodmay.ru/',
        city: 'Ленинский р-н, пос.Горки Ленинские',
        distance: '10 км от МКАД',
        addDistance: true,
        title: 'Резиденция Май',
        subtitle: 'Квартиры от 2,2 млн. руб.',
        background: '/assets/img/about/builder/residence-dom.jpg'
    }
];
