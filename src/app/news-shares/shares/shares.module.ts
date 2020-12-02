import { FormsRequestModule } from '../../forms-request/forms-request.module';
import { SharesService } from './shares.service';
import { SharesItemComponent } from './shares-item/shares-item.component';
import { SharesListComponent } from './shares-list/shares-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharesComponent } from './shares.component';
import { NgModule } from '@angular/core';
import { AuthorizationGuard } from '../../authorization/authorization-guard.service';
import { Uploader } from 'angular2-http-file-upload';
import { SharesItemsComponent } from './shares-list/shares-items/shares-items.component';
import { SharesEditFormsModule } from './shares-edit/shares-edit-forms.module';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';
import { ApartmentModule } from '../../flats/apartment/apartment.module';
import { NewsSharesSnippetModule } from '../news-shares-snippet/news-shares-snippet.module';

const SHARES_COMPONENTS = [
    SharesComponent,
    SharesListComponent,
    SharesItemsComponent,
    SharesItemComponent
];

@NgModule({
    declarations: [...SHARES_COMPONENTS],
    exports: [...SHARES_COMPONENTS],
    imports: [
        CommonModule,
        FormsRequestModule,
        SharesEditFormsModule,
        NewsSharesSnippetModule,
        NavMenuModule,
        ApartmentModule,
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
        Uploader,
        AuthorizationGuard
    ]
})
export class SharesModule {}
