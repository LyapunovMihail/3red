import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAutoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements OnInit {

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.resize();
        });
    }

    @HostListener('input')
    onInput() {
        this.resize();
    }
    @HostListener('cut')
    onCut() {
        this.resize();
    }
    @HostListener('paste')
    onPaste() {
        this.resize();
    }
    @HostListener('drop')
    onDrop() {
        this.resize();
    }
    @HostListener('change')
    onChange() {
        this.resize();
    }

    private resize() {
        const textArea = this.element.nativeElement;
        this.renderer.setStyle(textArea, 'height', 'auto');
        this.renderer.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
    }
}
