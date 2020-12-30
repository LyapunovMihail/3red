import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { JkObjectsListService } from '../jk-objects-list.service';

@Directive({
    selector: '[appDragNDropJk]',
    providers: [JkObjectsListService]
})
export class DragNDropJkDirective implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    private jkMas: IObjectSnippet[];
    @Input()
    private i: number;

    private mockObject;
    private currentDroppable;
    private draggableElement;
    private parentElement;

    constructor(
        private jkObjectsListService: JkObjectsListService,
        private elRef: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
        this.draggableElement = this.elRef.nativeElement;
        this.draggableElement.setAttribute('i', this.i);
        this.parentElement = this.elRef.nativeElement.parentElement;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(e) {
        if (!this.isAuthorizated) { return; }
        if (!e.target.classList.contains('objects__item') && !e.target.classList.contains('objects__item-grabber')) { return; }
        if (e.which !== 1) { return; }

        const shiftX = e.clientX - this.draggableElement.getBoundingClientRect().left;
        const shiftY = e.clientY - this.draggableElement.getBoundingClientRect().top;
        const width = this.draggableElement.offsetWidth;
        const height = this.draggableElement.offsetHeight;

        this.mockObject = this.renderer.createElement('div');
        this.renderer.addClass(this.mockObject, 'objects__item');
        this.renderer.addClass(this.mockObject, 'objects__item-highlight');
        this.renderer.insertBefore(this.parentElement, this.mockObject, this.draggableElement);

        this.renderer.setStyle(this.draggableElement, 'position', 'absolute');
        this.renderer.setStyle(this.draggableElement, 'zIndex', 50);
        this.renderer.setStyle(this.draggableElement, 'width', width + 'px');
        this.renderer.setStyle(this.draggableElement, 'height', height + 'px');
        this.renderer.addClass(this.draggableElement, 'objects__item-highlight');
        this.renderer.addClass(this.draggableElement, 'objects__item-highlight--grabbed');
        const img = this.draggableElement.querySelector('img');
        if (img) {
            this.renderer.setStyle(img, 'width', width + 'px');
            this.renderer.setStyle(img, 'height', height + 'px');
        }

        this.renderer.appendChild(document.body, this.draggableElement);

        this.onMouseMove(e.pageX, e.pageY, e.clientX, e.clientY, shiftX, shiftY);
        const that = this;

        document.addEventListener('mousemove', onMouseMoveNative);
        function onMouseMoveNative(event) {
            that.onMouseMove(event.pageX, event.pageY, event.clientX, event.clientY, shiftX, shiftY);
        }

        this.draggableElement.addEventListener('mouseup', onMouseUpNative);
        function onMouseUpNative() {
            that.onMouseUp();
            document.removeEventListener('mousemove', onMouseMoveNative);
            that.draggableElement.removeEventListener('mouseup', onMouseUpNative);
        }
    }

    private onMouseMove(pageX, pageY, clientX, clientY, shiftX, shiftY) {
        this.renderer.setStyle(this.draggableElement, 'left', pageX - shiftX + 'px');
        this.renderer.setStyle(this.draggableElement, 'top', pageY - shiftY + 'px');

        this.renderer.setStyle(this.draggableElement, 'visibility', 'hidden');
        const elemBelow = document.elementFromPoint(clientX, clientY);
        this.renderer.setStyle(this.draggableElement, 'visibility', 'visible');

        if (!elemBelow) { return; }

        const droppableBelow = elemBelow.closest('.objects__item');

        if (this.currentDroppable !== droppableBelow) {
            if (this.currentDroppable) {
                this.renderer.removeClass(this.currentDroppable, 'objects__item-highlight');
            }
            this.currentDroppable = droppableBelow;
            if (this.currentDroppable) {
                this.renderer.addClass(this.currentDroppable, 'objects__item-highlight');
            }
        }
    }

    private onMouseUp() {
        if (!this.currentDroppable || this.currentDroppable === this.mockObject) {
            this.renderer.removeChild(document.body, this.draggableElement);
            this.renderer.insertBefore(this.parentElement, this.draggableElement, this.mockObject);
            this.renderer.removeChild(this.parentElement, this.mockObject);
            this.renderer.removeClass(this.draggableElement, 'objects__item-highlight');
            this.renderer.removeClass(this.draggableElement, 'objects__item-highlight--grabbed');
            this.draggableElement.style = '';
        } else {
            const img = this.draggableElement.querySelector('img');
            const droppableImg = this.currentDroppable.querySelector('img');
            const imgWidth = img.offsetWidth;
            const imgHeight = img.offsetHeight;
            const droppableImgWidth = droppableImg.offsetWidth;
            const droppableImgHeight = droppableImg.offsetHeight;
            this.renderer.setStyle(img, 'width', droppableImgWidth + 'px');
            this.renderer.setStyle(img, 'height', droppableImgHeight + 'px');
            this.renderer.setStyle(droppableImg, 'width', imgWidth + 'px');
            this.renderer.setStyle(droppableImg, 'height', imgHeight + 'px');

            this.renderer.removeChild(document.body, this.draggableElement);
            this.renderer.insertBefore(this.parentElement, this.draggableElement, this.currentDroppable);
            this.renderer.insertBefore(this.parentElement, this.currentDroppable, this.mockObject);
            this.renderer.removeChild(this.parentElement, this.mockObject);
            this.renderer.removeClass(this.draggableElement, 'objects__item-highlight');
            this.renderer.removeClass(this.draggableElement, 'objects__item-highlight--grabbed');
            this.renderer.removeClass(this.currentDroppable, 'objects__item-highlight');
            this.draggableElement.style = '';
            this.swapMassiveElements();
            this.saveChanges();
        }
        this.currentDroppable = null;
    }

    private swapMassiveElements() {
        const droppableIndex = Number(this.currentDroppable.getAttribute('i'));
        const swapElement = this.jkMas[this.i];
        this.jkMas[this.i] = this.jkMas[droppableIndex];
        this.jkMas[droppableIndex] = swapElement;
        this.draggableElement.setAttribute('i', droppableIndex);
        this.currentDroppable.setAttribute('i', this.i);
    }

    private saveChanges() {
        this.jkObjectsListService.updateCollection(this.jkMas).subscribe(
            () => console.log(),
            (err) => console.error(err)
        );
    }

    @HostListener('dragStart', ['$event'])
    onDragStart(e) {
        e.preventDefault();
        return false;
    }
}
