import { HeaderPipe } from './header.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { HeaderNavComponent } from './header-nav/header-nav.component';

@NgModule({
    exports : [
        HeaderPipe,
        HeaderComponent,
        HeaderNavComponent
    ],
    declarations : [
        HeaderPipe,
        HeaderComponent,
        HeaderNavComponent
    ],
    imports : [
        RouterModule,
        CommonModule
    ]
})

export class HeaderModule { }
