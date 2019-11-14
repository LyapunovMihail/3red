import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    HostListener,
    Inject,
    ViewEncapsulation,
    PLATFORM_ID,
    forwardRef
} from '@angular/core';
import {
    isPlatformBrowser,
    isPlatformServer
} from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ghm-range-number',
    styleUrls: ['./ghm-range-number.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GHMRangeNumberComponent),
            multi: true
        }
    ],
    template: `
        <div class="ghm-range-number">
            <div class="ghm-slider parameters-filtering_range_slider">
        
                <div class="parameters-filtering_range_line ghm-fill"></div>
        
                <div class="ghm-runner parameters-filtering_range_runner ghm-runner--first"
                    [style.left.px]="firstLeft" 
                    (touchstart)="mouseDown($event, 'first')">
                    <div class="parameters-filtering_range_runner-touch"></div>
                </div>
                
                <div class="ghm-runner parameters-filtering_range_runner ghm-runner--second"
                    [style.left.px]="secondLeft"
                    (touchstart)="mouseDown($event, 'second')">
                    <div class="parameters-filtering_range_runner-touch"></div>
                </div>

            </div>
        </div>
    `
})

export class GHMRangeNumberComponent implements OnInit, ControlValueAccessor {

    @Input( ) public min: number;
    @Input( ) public max: number;
    @Input( ) public toFixed: boolean = false;
    @Output( ) public move = new EventEmitter ();
    public firstLeft: number;
    public secondLeft: number;
    private value: any;
    private firstValue = this.min;
    private secondValue = this.max;
    private sliderCoords: any;
    private buttonCoords: any;
    private shiftX: any;
    private isRun: boolean = false;
    private type: string;
    private rememberVal = '';

    constructor(
        private elRef: ElementRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    public ngOnInit() {
        if ( isPlatformBrowser(this.platformId) ) {
            this.elRef.nativeElement.classList.add('ghm-range');
        }
    }

    public writeValue(control) {
        if (control) {
            this.start(control.min, control.max);
        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public start(min, max) {
        if ( this.min < this.max && min && max && isPlatformBrowser(this.platformId) ) {
            let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
            let secondRunnerElement = this.elRef.nativeElement.querySelector('.ghm-runner--second');

            this.firstLeft = (min >= this.min && min <= this.max)
                ? (sliderElement.clientWidth / (this.max - this.min)) * (min - this.min)
                : 0;

            this.secondLeft = (max <= this.max && max >= this.min)
                ? (((sliderElement.clientWidth - secondRunnerElement.clientWidth) / (this.max - this.min)) * (max - this.min) )
                : sliderElement.clientWidth - secondRunnerElement.clientWidth;

            this.firstValue = (min >= this.min && min <= this.max) ? min : this.min;
            this.secondValue = (max <= this.max && max >= this.min) ? max : this.max;

            let fillElement = this.elRef.nativeElement.querySelector('.ghm-fill');
            fillElement.style.left = ( ( ( this.secondLeft > this.firstLeft )
                ? this.firstLeft
                : this.secondLeft ) + secondRunnerElement.clientWidth ) + 'px';
            fillElement.style.width = Math.abs( this.secondLeft - this.firstLeft ) + 'px';

            this.move.emit({
                min: (this.firstValue <= this.secondValue) ? this.firstValue : this.secondValue,
                max: (this.firstValue >= this.secondValue) ? this.firstValue : this.secondValue
            });
        }
    }

    public getCoords(el) {
        let box = el.getBoundingClientRect();
        return {
            left: box.left + pageXOffset
        };
    }

    public mouseDown(e, type) {
        this.type = type;
        this.rememberVal = this.value;
        this.isRun = true;
        let runnerElement = this.elRef.nativeElement.querySelector(`.ghm-runner--${this.type}`);
        let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
        this.buttonCoords = this.getCoords(runnerElement);
        this.sliderCoords = this.getCoords(sliderElement);
        this.shiftX = e.touches[0].pageX - this.buttonCoords.left;
    }

    @HostListener('document:touchmove', ['$event'])
    public mouseMove(e) {
        if ( this.isRun ) {
            // runner slide left position
            let sliderElement = this.elRef.nativeElement.querySelector('.ghm-slider');
            let runnerElement = this.elRef.nativeElement.querySelector(`.ghm-runner--${this.type}`);
            let newLeft = e.touches[0].pageX - this.shiftX - this.sliderCoords.left;
            let rightEdge = sliderElement.clientWidth - runnerElement.clientWidth;
            newLeft = ( newLeft < 0) ? 0 : (newLeft > rightEdge) ? rightEdge : newLeft;
            if ( this.type === 'second' ) {
                this.secondLeft = newLeft;
            } else {
                this.firstLeft = newLeft;
            }

            // runner count output value
            let valuePeriod = Number(this.max) - Number(this.min);
            let step = Number(sliderElement.clientWidth - runnerElement.clientWidth) / Number(valuePeriod);
            let value = parseFloat((Number(this.min) + Number(newLeft) / Number(step)).toFixed( (this.toFixed) ? 0 : 2 ));

            if (this.value !== value) {
                this.value = value;
                if ( this.type === 'first' ) {
                    this.firstValue = value;
                } else {
                    this.secondValue = value;
                }

                this.move.emit({
                    min: (this.firstValue <= this.secondValue) ? this.firstValue : this.secondValue,
                    max: (this.firstValue >= this.secondValue) ? this.firstValue : this.secondValue
                });
            }

            runnerElement.ondragstart = () => {
                return false;
            };

            let fillElement = this.elRef.nativeElement.querySelector('.ghm-fill');
            fillElement.style.left = ( ( ( this.secondLeft > this.firstLeft )
                ? this.firstLeft
                : this.secondLeft ) + runnerElement.clientWidth ) + 'px';
            fillElement.style.width = Math.abs( this.secondLeft - this.firstLeft ) + 'px';
        }
    }

    @HostListener('document:touchend', ['$event'])
    public mouseUp(e) {
        if ( this.isRun ) {
            this.isRun = false;
            this.propagateChange({
                min: (this.firstValue <= this.secondValue) ? this.firstValue : this.secondValue,
                max: (this.firstValue >= this.secondValue) ? this.firstValue : this.secondValue
            });
        }
    }
}
