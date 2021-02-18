import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { PlatformDetectService } from '../../platform-detect.service';

@Component({
    selector: 'app-about-product',
    templateUrl: './about-product.component.html',
    styleUrls: ['./about-product.component.scss']
})

export class AboutProductComponent implements OnInit, OnDestroy, AfterViewInit {

    public windowScrollEvent;
    public scrollTop;

    @ViewChild('year1', { static: false })
    public year1: ElementRef;
    @ViewChild('year2', { static: false })
    public year2: ElementRef;
    @ViewChild('year3', { static: false })
    public year3: ElementRef;

    constructor(
        private platform: PlatformDetectService,
        private windowEventsService: WindowEventsService
    ) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (!this.platform.isBrowser) { return; }

        this.windowScrollEvent = this.windowEventsService.onScroll.subscribe(() => {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (this.scrollTop > this.year1.nativeElement.offsetTop - 290) {
                this.year1.nativeElement.classList.add('product__parallax-item6--active');
                this.year1.nativeElement.classList.add('product__parallax-item6--op');
            }
            if (this.scrollTop > this.year2.nativeElement.offsetTop - 290) {
                this.year2.nativeElement.classList.add('product__parallax-item7--active');
                this.year2.nativeElement.classList.add('product__parallax-item7--op');
            }
            if (this.scrollTop > this.year3.nativeElement.offsetTop - 290) {
                this.year3.nativeElement.classList.add('product__parallax-item8--active');
                this.year3.nativeElement.classList.add('product__parallax-item8--op');
                this.windowScrollEvent.unsubscribe();
            }
        });
    }

    ngOnDestroy() {
        this.windowScrollEvent.unsubscribe();
    }
}
