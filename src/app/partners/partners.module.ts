import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { NgModule } from '@angular/core';
import { PartnersTabsAdminComponent } from './partners-tabs-admin/partners-tabs-admin.component';
import { AdminModalModule } from '../admin-modal/admin-modal.module';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnersAdminComponent } from './partners-content-admin/partners-admin.component';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';

const partnersComponents = [
    PartnersComponent,
    PartnersTabsAdminComponent,
    PartnersAdminComponent
];

@NgModule({
    exports: [
        ...partnersComponents
    ],
    declarations: [
        ...partnersComponents
    ],
    imports: [
        CommonModule,
        AdminModalModule,
        SlideTopLabelModule,
        AutoResizeTextareaModule,
        ReactiveFormsModule,
        NavMenuModule,
        RouterModule.forChild([
            { path: '', component: PartnersComponent }
        ])
    ]
})

export class PartnersModule {}
