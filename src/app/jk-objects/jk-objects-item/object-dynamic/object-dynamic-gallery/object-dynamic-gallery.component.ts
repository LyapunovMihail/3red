import { Component, OnInit, Input } from '@angular/core';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';
import { IDynamicObject, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';

@Component({
    selector: 'app-object-dynamic-gallery',
    templateUrl: 'object-dynamic-gallery.component.html',
    styleUrls: ['object-dynamic-gallery.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class ObjectDynamicGalleryComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    public tempArray: IDynamicObject[];
    @Input()
    public month: number;
    @Input()
    public year: number;

    public isVideoShow = false;
    public videoUrl = '';
    public isSlideShow = false;
    public slideShowCurrent = 0;
    public slideShowObject: IDynamicObject;

    uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    constructor( public windowScrollLocker: WindowScrollLocker ) { }

    ngOnInit() { }

    public startSlideShow(object, i) {
        if ( !this.isAuthorizated ) {
            this.windowScrollLocker.block();
            this.slideShowObject = object;
            this.slideShowCurrent = i;
            this.isSlideShow = true;
        }
    }

    public startVideoShow(url) {
        if ( !this.isAuthorizated ) {
            this.windowScrollLocker.block();
            this.isVideoShow = true;
            this.videoUrl = url;
        }
    }

    public getId(title) {
        return title.split('').map((item: string) => item.charCodeAt(0)).join('');
    }
}
