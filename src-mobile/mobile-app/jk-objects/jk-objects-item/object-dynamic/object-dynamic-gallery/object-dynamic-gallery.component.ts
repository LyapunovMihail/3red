import { Component, OnInit, Input } from '@angular/core';
import { fakeObject } from './mockObject';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';

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

    public tempArray = fakeObject;

    public isVideoShow = false;
    public videoUrl = '';
    public isSlideShow = false;
    public slideShowId: any;
    public slideShowCurrent = 0;

    constructor( public windowScrollLocker: WindowScrollLocker ) { }

    ngOnInit() { }

    public startSlideShow(id, i) {
        if ( !this.isAuthorizated ) {
            this.windowScrollLocker.block();
            this.isSlideShow = true;
            this.slideShowId = id;
            this.slideShowCurrent = i;
        }
    }

    public startVideoShow(url) {
        if ( !this.isAuthorizated ) {
            this.windowScrollLocker.block();
            this.isVideoShow = true;
            this.videoUrl = url;
        }
    }
}
