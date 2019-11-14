import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { NgModule } from '@angular/core';

@NgModule ({
    exports: [
        ErrorPageComponent
    ],
    declarations: [
        ErrorPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RouterModule.forChild([
            { path: '**', component: ErrorPageComponent, pathMatch: 'full' }
        ])
    ]
})

export class ErrorPageModule {}