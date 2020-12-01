import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApartmentComponent } from './apartment.component';
import { FurnitureComponent } from './apartment-furniture/furniture.component';
import { SchemaComponent } from './apartment-schema/schema.component';
import { InfoComponent } from './apartment-info/info.component';
import { ActionsComponent } from './appartment-actions/actions.component';

const AgreementComponents = [
    ApartmentComponent,
    FurnitureComponent,
    SchemaComponent,
    InfoComponent,
    ActionsComponent,
];

@NgModule({
    exports: [
        ...AgreementComponents
    ],
    declarations: [
        ...AgreementComponents,
    ],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        RouterModule.forChild([
            {path: 'apartment', component: ApartmentComponent}
        ])
    ]
})

export class ApartmentModule {
}
