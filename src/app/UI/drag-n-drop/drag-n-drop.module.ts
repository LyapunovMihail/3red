import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNDropDirective } from './drag-n-drop.directive';

@NgModule({
    exports: [
        DragNDropDirective
    ],
    declarations: [
        DragNDropDirective
    ],
    imports: [
        CommonModule
    ]
})
export class DragNDropModule {
}
