import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreroomsComponent } from './storerooms.component';
import { ListComponent } from './list/list.component';
import { FloorComponent } from './floor/floor.component';
import { FloorComponents } from './floor/floor';
import { HouseSVGSanitizePipe } from './house-svg-sanitize.pipe';
import { FormsRequestModule } from '../forms-request/forms-request.module';

const StoreroomsComponents = [
    StoreroomsComponent,
    FloorComponents,
    ListComponent,
    HouseSVGSanitizePipe
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
            { path: 'storerooms', component: StoreroomsComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListComponent },
                    { path: 'section/:section/floor/:floor', component: FloorComponent }
                ]}
        ])
    ]
})

export class StoreroomsModule {}
