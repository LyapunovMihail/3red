import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNewsComponent } from './home-news.component';
import { RouterModule } from '@angular/router';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';

@NgModule({
    exports: [
        HomeNewsComponent
    ],
    declarations: [
        HomeNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NavMenuModule,
    ]
})
export class HomeNewsModule {
}
