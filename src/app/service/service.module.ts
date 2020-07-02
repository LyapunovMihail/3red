import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { NgModule } from '@angular/core';
import { ServiceTabsAdminComponent } from './service-tabs-admin/service-tabs-admin.component';
import { AdminModalModule } from '../admin-modal/admin-modal.module';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceAdminComponent } from './service-content-admin/service-admin.component';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';

const serviceComponents = [
    ServiceComponent,
    ServiceTabsAdminComponent,
    ServiceAdminComponent
];

@NgModule({
    exports: [
        ...serviceComponents
    ],
    declarations: [
        ...serviceComponents
    ],
    imports: [
        CommonModule,
        AdminModalModule,
        SlideTopLabelModule,
        AutoResizeTextareaModule,
        ReactiveFormsModule,
        NavMenuModule,
        RouterModule.forChild([
            { path: '', component: ServiceComponent }
        ])
    ]
})

export class ServiceModule {}
