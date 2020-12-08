import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsComponent } from './furniture-tabs/tabs.component';
import { ExamplesComponent } from './furniture-examples/examples.component';
import { ListComponent } from './furniture-list/list.component';

const FurnitureComponents = [
    TabsComponent,
    ExamplesComponent,
    ListComponent,
];

@NgModule({
    exports: [
        ...FurnitureComponents
    ],
    declarations: [
        ...FurnitureComponents,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
    ]
})

export class FurnitureModule {
}
