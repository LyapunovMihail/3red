import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './authorization.component';
import { AuthorizationService } from  './authorization.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthorizationComponent
    ],
    exports: [
        AuthorizationComponent
    ],
    providers: [
        AuthorizationService
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class AuthorizationModule { }