import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsRequestModule } from '../../forms-request/forms-request.module';
import { ApartmentComponent } from './apartment.component';

@NgModule({
    exports: [
        ApartmentComponent
    ],
    declarations: [
        ApartmentComponent
    ],
    imports: [
        CommonModule,
        FormsRequestModule,
        RouterModule
    ]
})
export class ApartmentModule { }
