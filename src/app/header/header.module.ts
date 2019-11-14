import { HeaderPipe } from './header.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';

@NgModule({
    exports : [
        HeaderPipe,
        HeaderComponent
    ],
    declarations : [
        HeaderPipe,
        HeaderComponent
    ],
    imports : [
        RouterModule,
        CommonModule
    ]
})

export class HeaderModule { }
