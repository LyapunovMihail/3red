import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomePreviewComponent } from './preview/home-preview.component';
import { HomeDescriptionComponent } from './description/home-description.component';
import { HomePlacesComponent } from './places/home-places.component';
import { HomeGalleryAdminComponent } from './gallery-admin/home-gallery-admin.component';
import { HomeNewsComponent } from './news/home-news.component';
import { HomeService } from './home.service';
import { SharesDayPipe } from './preview/shares-day.pipe';
import { LineBreakPipe } from './line-break.pipe';
import { HomeTriggerComponent } from './trigger/home-trigger.component';

@NgModule({
  exports : [
    HomeComponent
  ],
  declarations : [
      HomeComponent,
      HomePreviewComponent,
      HomeTriggerComponent,
      HomeDescriptionComponent,
      HomePlacesComponent,
      HomeGalleryAdminComponent,
      HomeNewsComponent,
      SharesDayPipe,
      LineBreakPipe
  ],
  imports : [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers : [
      HomeService
  ]
})

export class HomeModule {

}
