import { SeoService } from './seo.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo.component';

@NgModule({
    declarations: [
        SeoComponent
    ],
    exports: [
        SeoComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        RouterModule.forChild([
            {path: 'seo', component: SeoComponent}
        ])
    ],
    providers: [
        SeoService
    ]
})

export class SeoModule {}
