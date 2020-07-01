import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuComponent } from './nav-menu.component';

@NgModule({
    imports: [ CommonModule ],
    exports: [ NavMenuComponent ],
    declarations: [ NavMenuComponent ],
    providers: [],
})
export class NavMenuModule { }
