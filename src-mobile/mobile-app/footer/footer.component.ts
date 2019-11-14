import { WindowScrollLocker } from '../commons/window-scroll-block';
import { OverlayService } from '../modal/overlay.service';
import { Component } from '@angular/core';

@Component({
    selector : 'app-footer',
    templateUrl : './footer.component.html',
    styleUrls : ['./footer.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class FooterComponent {

    constructor(
        private windowScrollLocker: WindowScrollLocker,
        private overlayService: OverlayService
    ) { }

    openVideo() {
        this.overlayService.changeOverlayVisibility(true);
        this.windowScrollLocker.block();
    }

}
