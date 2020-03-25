import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModalModule } from '../../../admin-modal/admin-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { ObjectMembersAdminComponent } from './object-members-admin/object-members-admin.component';
import { ObjectMembersComponent } from './object-members.component';

@NgModule({
    exports: [
        ObjectMembersComponent,
        ObjectMembersAdminComponent
    ],
    declarations: [
        ObjectMembersComponent,
        ObjectMembersAdminComponent
    ],
    imports: [
        CommonModule,
        AdminModalModule,
        ReactiveFormsModule,
        SlideTopLabelModule
    ]
})
export class ObjectMembersModule { }
