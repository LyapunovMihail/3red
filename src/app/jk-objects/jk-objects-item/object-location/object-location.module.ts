import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectLocationComponent } from './object-location.component';
import { LocationRoutesComponent } from './location-routes/location-routes.component';
import { LocationInfrastructureComponent } from './location-infrastructure/location-infrastructure.component';
import { ObjectLocationTabsAdminComponent } from './object-location-tabs-admin/object-location-tabs-admin.component';
import { AdminModalModule } from '../../../admin-modal/admin-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { ObjectLocationAdminComponent } from './object-location-content-admin/object-location-admin.component';
import { RoutesAdminComponent } from './object-location-content-admin/routes-admin/routes-admin.component';
import { InfrastructureAdminComponent } from './object-location-content-admin/infrastructure-admin/infrastructure-admin.component';
import { LocationRoutesPipe } from './location-routes/location-routes.pipe';

@NgModule({
    exports: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent,
        ObjectLocationTabsAdminComponent,
        ObjectLocationAdminComponent,
        RoutesAdminComponent,
        InfrastructureAdminComponent,
        LocationRoutesPipe
    ],
    declarations: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent,
        ObjectLocationTabsAdminComponent,
        ObjectLocationAdminComponent,
        RoutesAdminComponent,
        InfrastructureAdminComponent,
        LocationRoutesPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdminModalModule,
        SlideTopLabelModule
    ]
})
export class ObjectLocationModule {
}
