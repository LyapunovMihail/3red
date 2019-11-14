import { PlatformDetectService } from './../../../platform-detect.service';
import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, HostListener, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ghm-range-number',
    styleUrls: ['./ghm-range-number.component.scss'],
    template: `
        <div class="ghm-range-number">
            <div class="ghm-slider ghm-range-number-slider"></div>
            <div class="ghm-range-number-runner-wrapper" [style.left]="newLeft - 10 + 'px'" (touchstart)="mouseDown($event)" >
                <div class="ghm-runner ghm-range-number-runner"></div>
            </div>
        </div>
    `,
    providers: [
        PlatformDetectService
    ]
})

export class GHMRangetNumberComponent implements OnChanges {

    @Input( ) start: any = 0;
    @Input( ) min: any = 0;
    @Input( ) max: any = 100;
    @Input( ) unit: any = '';
    @Input( ) toFixed: boolean = false;
    @Output( ) move = new EventEmitter ();
    @Output( ) moveend = new EventEmitter ();

    rememberVal = '';

    value: any;
    sliderCoords: any;
    buttonCoords: any;
    shiftX: any;
    isRun: boolean = false;
    newLeft: number = 0;

    constructor (
        private elRef: ElementRef,
        private platform: PlatformDetectService
    ) {  }

    ngOnChanges ( changes: SimpleChanges ) {
        if (!this.platform.isBrowser) { return; }
        let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
        let runnerElement = this.elRef.nativeElement.querySelector('.ghm-runner');
        let valuePeriod = (Number(this.max) - Number(this.min));
        let step = Number(sliderElement.clientWidth - runnerElement.clientWidth) / Number(valuePeriod);
        this.newLeft = (Number(this.start) > Number(this.max)) ? (sliderElement.clientWidth - runnerElement.clientWidth) : (Number(this.start) < Number(this.min)) ? 0 : (Number(this.start) - Number(this.min)) * Number(step);
        this.value = parseFloat((Number(this.min) + Number(this.newLeft) / Number(step)).toFixed( (this.toFixed) ? 0 : 2 ));
    }

    getCoords ( el ) {
        let box = el.getBoundingClientRect();
        return {
            left: box.left + pageXOffset
        };
    }

    mouseDown ( e ) {
        if (!this.platform.isBrowser) { return; }
        this.rememberVal = this.value;
        this.isRun = true;
        let runnerElement = this.elRef.nativeElement.querySelector('.ghm-runner');
        let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
        this.buttonCoords = this.getCoords(runnerElement);
        this.sliderCoords = this.getCoords(sliderElement);
        this.shiftX = e.touches[0].pageX - this.buttonCoords.left;
    }

    @HostListener('document:touchmove', ['$event'])
    mouseMove(e) {
        if (!this.platform.isBrowser) { return; }
        if ( this.isRun ) {

            // runner slide left position
            let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
            let runnerElement = this.elRef.nativeElement.querySelector('.ghm-runner');
            let newLeft = e.touches[0].pageX - this.shiftX - this.sliderCoords.left;
            let rightEdge = sliderElement.clientWidth - runnerElement.clientWidth;
            newLeft = ( newLeft < 0) ? 0 : (newLeft > rightEdge) ? rightEdge : newLeft;
            this.newLeft = newLeft;

            // runner count output value
            let valuePeriod = Number(this.max) - Number(this.min);
            let step = Number(sliderElement.clientWidth - runnerElement.clientWidth) / Number(valuePeriod);
            let value = parseFloat((Number(this.min) + Number(newLeft) / Number(step)).toFixed( (this.toFixed) ? 0 : 2 ));

            if (this.value != value) {
                this.value = value;
                this.move.emit( value );
            }
        }
    }

    @HostListener('document:touchend', ['$event'])
    mouseUp(e) {
        if ( this.isRun ) {
            this.isRun = false;
            this.moveend.emit( this.value );
        }
    }
}
