import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectNewsComponent } from './object-news.component';
import { RouterModule } from '@angular/router';
import { NavMenuModule } from '../../../UI/nav-menu/nav-menu.module';

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
        NavMenuModule,
    ]
})
export class ObjectNewsModule {
}
