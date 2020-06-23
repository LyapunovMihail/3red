import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreroomsComponent } from './storerooms.component';
import { ListComponent } from './list/list.component';
import { FloorComponent } from './floor/floor.component';
import { FloorComponents } from './floor/floor';
import { HouseSVGSanitizePipe } from './house-svg-sanitize.pipe';
import { FormsRequestModule } from '../../../../forms-request/forms-request.module';
import { BitNumberPipe } from './list/bit-number.pipe';

const StoreroomsComponents = [
    StoreroomsComponent,
    FloorComponents,
    ListComponent,
    HouseSVGSanitizePipe,
    BitNumberPipe
];

@NgModule({
    exports: [
        ...StoreroomsComponents
    ],
    declarations: [
        ...StoreroomsComponents
    ],
    imports: [
        FormsRequestModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'list/:id/storerooms', component: StoreroomsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListComponent },
                    { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent }
                ]}
        ])
    ]
})

export class StoreroomsModule {}
