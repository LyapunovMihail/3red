import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { ObjectMembersComponent } from './object-members.component';

@NgModule({
    exports: [
        ObjectMembersComponent,
    ],
    declarations: [
        ObjectMembersComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SlideTopLabelModule
    ]
})
export class ObjectMembersModule { }
