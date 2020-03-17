import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectLocationComponent } from './object-location.component';
import { LocationRoutesComponent } from './location-routes/location-routes.component';
import { LocationInfrastructureComponent } from './location-infrastructure/location-infrastructure.component';

@NgModule({
    exports: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent
    ],
    declarations: [
        ObjectLocationComponent,
        LocationRoutesComponent,
        LocationInfrastructureComponent

    ],
    imports: [
        CommonModule
    ]
})
export class ObjectLocationModule {
}
