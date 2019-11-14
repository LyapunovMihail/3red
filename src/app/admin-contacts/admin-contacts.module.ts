import { CommonModule } from '@angular/common';
import { AdminContactsService } from './admin-contacts.service';
import { AdminContactsComponent } from './admin-contacts.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations : [
        AdminContactsComponent
    ],
    exports : [
        AdminContactsComponent
    ],
    imports : [
        CommonModule,
        RouterModule
    ],
    providers : [
        AdminContactsService
    ]
})

export class AdminContactsModule {}
