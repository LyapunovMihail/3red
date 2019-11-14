import { Injectable } from '@angular/core';

export interface IDecorationList {
    name: string;
    mod: string;
    url: string;
    preview: string;
    images: string[];
}

@Injectable()

export class DecorationService {

    public decorationItems: IDecorationList[] = [
        {
            name: 'Жилые комнаты',
            mod: 'living-rooms',
            url: '/decoration/living-rooms',
            preview: '/assets/img/decoration/bedroom_classic.jpg',
            images: [
                '/assets/img/decoration/living-room/bedroom_classic.jpg',
                '/assets/img/decoration/living-room/bedroom_modern.jpg',
            ]
        }, {
            name: 'Кухня',
            mod: 'kitchen',
            url: '/decoration/kitchen',
            preview: '/assets/img/decoration/kitchen_classic.jpg',
            images: [
                '/assets/img/decoration/kitchen/kitchen_classic.jpg',
                '/assets/img/decoration/kitchen/kitchen_modern.jpg',
            ]
        }, {
            name: 'Санузел',
            mod: 'bathroom',
            url: '/decoration/bathroom',
            preview: '/assets/img/decoration/san_classic.jpg',
            images: [
                '/assets/img/decoration/bathroom/san_classic.jpg',
                '/assets/img/decoration/bathroom/san_modern.jpg',
            ]
        }, {
            name: 'Прихожая',
            mod: 'hallway',
            url: '/decoration/hallway',
            preview: '/assets/img/decoration/hall_classic.jpg',
            images: [
                '/assets/img/decoration/hallway/hall_classic.jpg',
                '/assets/img/decoration/hallway/hall_modern.jpg',
            ]
        }
        // {
        //     name: 'Общедомовые пространства',
        //     mod: 'places',
        //     url: '/decoration/places',
        //     preview: '/assets/img/decoration/places.jpg',
        //     images: [
        //         '/assets/img/decoration/places/float_1.jpg',
        //         '/assets/img/decoration/places/float_1-2.jpg',
        //         '/assets/img/decoration/places/float_3.jpg',
        //         '/assets/img/decoration/places/float_1-3.jpg',
        //         '/assets/img/decoration/places/float.jpg',
        //         '/assets/img/decoration/places/float-17.jpg'
        //     ]
        // }
    ];

    public getDecorationItems() {
        return this.decorationItems;
    }

}
