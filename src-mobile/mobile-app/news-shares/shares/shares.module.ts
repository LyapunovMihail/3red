import { FormsRequestModule } from '../../forms-request/forms-request.module';
import { SharesDayPipe } from './shares-day.pipe';
import { SharesService } from './shares.service';
import { SharesItemComponent } from './shares-list/shares-item/shares-item.component';
import { SharesListComponent } from './shares-list/shares-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharesComponent } from './shares.component';
import { NgModule } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { SharesItemsComponent } from './shares-list/shares-items/shares-items.component';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';

const SHARES_COMPONENTS = [
    SharesComponent,
    SharesListComponent,
    SharesItemsComponent,
    SharesItemComponent,
    SharesDayPipe
];

@NgModule({
    declarations: [...SHARES_COMPONENTS],
    exports: [...SHARES_COMPONENTS],
    imports: [
        CommonModule,
        NavMenuModule,
        FormsRequestModule,
        RouterModule.forChild([
            {
                path: '', component: SharesComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: SharesListComponent, pathMatch: 'full' },
                    { path: 'list/:id', component: SharesItemComponent, pathMatch: 'full' }
                ]
            }
        ])
    ],
    providers: [
        SharesService,
        Uploader
    ]
})
export class SharesModule {}
