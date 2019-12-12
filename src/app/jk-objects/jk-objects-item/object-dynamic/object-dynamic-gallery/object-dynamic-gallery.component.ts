import { Component, OnInit, Input } from '@angular/core';
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

    @Input() public tempArray;

    public isVideoShow: boolean = false;
    public videoUrl: string = '';
    public isSlideShow: boolean = false;
    public slideShowId: any;
    public slideShowCurrent: number = 0;

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
