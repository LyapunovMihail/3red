import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectNewsComponent } from './object-news.component';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        ObjectNewsComponent
    ],
    declarations: [
        ObjectNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class ObjectNewsModule {
}
