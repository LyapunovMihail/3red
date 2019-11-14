import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VideoModalService } from './video-modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-video-modal',
    template: `
        <div class="modal-video" [class.modal-video--active]="visible">
            <div class="iv-embed"
                 style="margin: 0 auto; padding: 0; border: 0; max-width:642px; width: 100%">
                <div class="iv-v"
                     style="display:block;margin:0;padding:1px;border:0;background:#000;">
                    <iframe class="iv-i" style="display:block;margin:0;padding:0;border:0;"
                            src="https://open.ivideon.com/embed/v2/?server=100-EixxXoEHtsjbtNESh8O6pD&camera=0&width=&height=&lang=ru"
                            width="640" height="491" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="iv-b" style="display:block;margin:0;padding:0;border:0;">
                    <div style="float:right;text-align:right;padding:0 0 10px;line-height:10px;">
                        <a class="iv-a"
                           style="font:10px Verdana,sans-serif;color:inherit;opacity:.6;"
                           href="https://www.ivideon.com/" target="_blank">Powered by Ivideon</a>
                    </div>
                    <div style="clear:both;height:0;overflow:hidden;"></div>
                    <script src="https://open.ivideon.com/embed/v2/embedded.js"></script>
                </div>
            </div>
        </div>      `,
    styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements OnInit, OnDestroy {

    public visible: boolean;

    private subs: Subscription[] = [];
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private videoModalService: VideoModalService
    ) {
    }

    ngOnInit() {
        this.subs.push(
            this.videoModalService.getVideoVisibility
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((state: boolean) => {
                    this.visible = state;
                })
        );
    }

    ngOnDestroy() {
        this._ngUnsubscribe.next();
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }
}
