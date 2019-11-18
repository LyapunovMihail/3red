import { DynamicObjectVideoComponent } from './dynamic-object/dynamic-object-video/dynamic-object-video.component';
import { DynamicObjectSlideshowComponent } from './dynamic-object/dynamic-object-slideshow/dynamic-object-slideshow.component';
import { VideoSanitizerPipe } from './dynamic-object/video-sanitizer.pipe';
import { LineBreakPipe } from './dynamic-object/line-break.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicAdminCreateComponent } from './dynamic-admin-create/dynamic-admin-create.component';
import { DynamicService } from './dynamic.service';
import { DynamicLinkListComponent } from './dynamic-link-list/dynamic-link-list.component';
import { DynamicMonthSwitcherComponent } from './dynamic-month-switcher/dynamic-month-switcher.component';
import { DynamicObjectComponent } from './dynamic-object/dynamic-object.component';
import { DynamicDateComponent } from './dynamic-date/dynamic-date.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';
import { NgModule } from '@angular/core';
// New, for 3red
import { SettingsDynamicComponent } from './settings/settings.component';
import { ContentDynamicComponent } from './content/content-dynamic.component';
import { GHMTextAreaModule } from '../UI/ghm-textarea/ghm-textarea.module';

const DynamicComponents = [
    DynamicComponent,
    DynamicDateComponent,
    DynamicObjectComponent,
    DynamicMonthSwitcherComponent,
    DynamicLinkListComponent,
    DynamicAdminCreateComponent,
    LineBreakPipe,
    VideoSanitizerPipe,
    DynamicObjectSlideshowComponent,
    DynamicObjectVideoComponent,
    // New, for 3red
    SettingsDynamicComponent,
    ContentDynamicComponent
];

@NgModule({
    exports: [
        ...DynamicComponents
    ],
    declarations: [
        ...DynamicComponents
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        GHMTextAreaModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'dynamic/:year/:month', component: DynamicComponent, pathMatch: 'full' },
            // New, for 3red
            { path: 'dynamic/settings', component: SettingsDynamicComponent },
            { path: 'dynamic/content', component: ContentDynamicComponent }
        ])
    ],
    providers: [
        DynamicService
    ]
})

export class DynamicModule {}
