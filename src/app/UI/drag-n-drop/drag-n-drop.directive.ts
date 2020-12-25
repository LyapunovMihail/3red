import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appDragNDrop]'
})
export class DragNDropDirective implements OnInit {

    @Input() defaultSize = "16px";

    constructor(
        elRef: ElementRef
    ) {
    }

    ngOnInit(): void {

    }

}
