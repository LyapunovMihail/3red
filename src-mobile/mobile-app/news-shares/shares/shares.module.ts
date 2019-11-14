import { ModalApartamenModule } from '../../flats/modal-apartament/modal-apartament.module';
import { BitNumberPipe } from './bit-number.pipe';
import { SharesService } from './shares.service';
import { SharesDayPipe } from './shares-day.pipe';
import { SharesItemComponent } from './shares-list/shares-item/shares-item.component';
import { SharesListComponent } from './shares-list/shares-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharesComponent } from './shares.component';
import { NgModule } from '@angular/core';

const SHARES_COMPONENTS = [
    SharesComponent,
    SharesListComponent,
    SharesItemComponent,
    SharesDayPipe,
    BitNumberPipe
];

@NgModule({
    declarations: [...SHARES_COMPONENTS],
    exports: [...SHARES_COMPONENTS],
    imports: [
        CommonModule,
        ModalApartamenModule,
        RouterModule.forChild([
            {
                path: '', component: SharesComponent,
                children: [
                    { path: '', redirectTo: 'list/1', pathMatch: 'full' },
                    { path: 'list/:index', component: SharesListComponent, pathMatch: 'full' },
                    { path: 'list/:index/:id', component: SharesItemComponent, pathMatch: 'full' }
                ]
            }
        ])
    ],
    providers: [SharesService]
})
export class SharesModule {}
