import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ParkingComponent } from './parking.component';
import { FloorComponent } from './floor/floor.component';
import { FloorComponents } from './floor/floor';
import { ListComponent } from './list/list.component';
import { HouseSVGSanitizePipe } from './house-svg-sanitize.pipe';
import { FormsRequestModule } from '../../../../forms-request/forms-request.module';
import { ObjectFlatsService } from '../object-flats.service';
import { BitNumberPipe } from './list/bit-number.pipe';

const ParkingComponents = [
    ParkingComponent,
    FloorComponent,
    FloorComponents,
    ListComponent,
    HouseSVGSanitizePipe,
    BitNumberPipe
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
            { path: 'list/:id/parking', component: ParkingComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListComponent },
                    { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent }
                ]}
        ])
    ],
    providers: [ObjectFlatsService]
})

export class ParkingModule {}
