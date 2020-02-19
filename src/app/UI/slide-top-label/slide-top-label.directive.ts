import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSlideTopLabel]'
})
export class SlideTopLabelDirective implements OnInit {

    private value: string;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.value = this.element.nativeElement.value;
            if (this.value) {
                this.setLabelPositionTop(true);
            }
        });
    }

    @HostListener('input', ['$event.target.value'])
    setLabel(value) {
        this.value = value;
    }

    @HostListener('focusin')
    onfocus() {
        if (!this.value) {
            this.setLabelPositionTop(true);
        }
    }

    @HostListener('focusout')
    onfocusout() {
        if (!this.value) {
            this.setLabelPositionTop(false);
        }
    }

    private setLabelPositionTop(slideTop) {
        const nextElem = this.renderer.nextSibling(this.element.nativeElement);
        if (nextElem.tagName === 'LABEL') {
            this.renderer.setStyle(nextElem, 'top', slideTop ? '-28px' : '0');
            this.renderer.setStyle(nextElem, 'fontSize', slideTop ? '14px' : '18px');
        }
    }
}
