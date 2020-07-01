import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNewsComponent } from './home-news.component';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        HomeNewsComponent
    ],
    declarations: [
        HomeNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class HomeNewsModule {
}
