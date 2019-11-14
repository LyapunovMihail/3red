import { LineBreakPipe } from './line-break.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { NgModule } from '@angular/core';

const pipes = [
    PhoneNumberPipe,
    LineBreakPipe
];

@NgModule({
    declarations: [
        ...pipes
    ],
    exports: [
        ...pipes
    ]
})

export class MyPipesModule { }
