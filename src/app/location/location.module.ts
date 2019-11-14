import { LocationRoutesPipe } from './location-routes/location-routes.pipe';
import { LocationInfrastructureComponent } from './location-infrastructure/location-infrastructire.component';
import { LocationRoutesComponent } from './location-routes/location-routes.component';
import { LocationComponent } from './location.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const LocationComponents = [
    LocationComponent,
    LocationInfrastructureComponent,
    LocationRoutesComponent,
    LocationRoutesPipe
];

@NgModule ({
    exports: [
        ...LocationComponents
    ],
    declarations: [
        ...LocationComponents
    ],
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild([
            { path: 'location', component: LocationComponent,
                children: [
                    { path: '', redirectTo: 'routes', pathMatch: 'full' },
                    { path: 'office', component: LocationRoutesComponent },
                    { path: 'routes', component: LocationRoutesComponent },
                    { path: 'infrastructure', component: LocationInfrastructureComponent },
                ]}
        ])
    ]
})

export class LocationModule {}
