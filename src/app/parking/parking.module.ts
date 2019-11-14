import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ParkingComponent } from './parking.component';
import { FloorComponent } from './floor/floor.component';
import { FloorComponents } from './floor/floor';
import { ListComponent } from './list/list.component';
import { HouseSVGSanitizePipe } from './house-svg-sanitize.pipe';
import { FormsRequestModule } from '../forms-request/forms-request.module';

const ParkingComponents = [
    ParkingComponent,
    FloorComponent,
    FloorComponents,
    ListComponent,
    HouseSVGSanitizePipe
];

@NgModule({
    exports: [
        ...ParkingComponents
    ],
    declarations: [
        ...ParkingComponents
    ],
    imports: [
        FormsRequestModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'parking', component: ParkingComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListComponent },
                    { path: 'section/:section/floor/:floor', component: FloorComponent }
                ]}
        ])
    ]
})

export class ParkingModule {}
