import { IDynamicObject, DYNAMIC_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-dynamic-object-video',
    templateUrl: './dynamic-object-video.component.html',
    styleUrls: ['./dynamic-object-video.component.scss']
})

export class DynamicObjectVideoComponent {

    @Input() url: string = '';
    @Input() isVideoShow: boolean = false;

    @Output() close: EventEmitter<boolean> = new EventEmitter();

}
