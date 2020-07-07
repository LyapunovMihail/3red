import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectLocationComponent } from './object-location.component';
import { LocationRoutesComponent } from './location-routes/location-routes.component';
import { LocationInfrastructureComponent } from './location-infrastructure/location-infrastructure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { LocationRoutesPipe } from './location-routes/location-routes.pipe';
import { NavMenuModule } from '../../../UI/nav-menu/nav-menu.module';

@NgModule({
    exports: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent,
        LocationRoutesPipe
    ],
    declarations: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent,
        LocationRoutesPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SlideTopLabelModule,
        NavMenuModule,
    ]
})
export class ObjectLocationModule {
}
