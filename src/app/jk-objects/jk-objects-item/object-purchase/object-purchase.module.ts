import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectInstallmentComponent } from './installment/object-installment.component';
import { ObjectInstallmentPipe } from './installment/object-installment.pipe';
import { GHMRangetNumberModule } from './installment/ghm-range-number/ghm-range-number.module';
import { ObjectPurchaseComponent } from './object-purchase.component';
import { ObjectInstallmentService } from './installment/object-installment.service';
import { ObjectCreditOutputComponent } from './credit-output/object-credit-output.component';
import { ObjectCreditAdminComponent } from './credit-admin/object-credit-admin.component';
import { AdminModalModule } from '../../../admin-modal/admin-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { NavMenuModule } from '../../../UI/nav-menu/nav-menu.module';

@NgModule({
    exports: [
        ObjectPurchaseComponent,
        ObjectCreditOutputComponent,
        ObjectInstallmentComponent,
        ObjectInstallmentPipe,
        ObjectCreditAdminComponent
    ],
    declarations: [
        ObjectPurchaseComponent,
        ObjectCreditOutputComponent,
        ObjectInstallmentComponent,
        ObjectInstallmentPipe,
        ObjectCreditAdminComponent
    ],
    imports: [
        CommonModule,
        GHMRangetNumberModule,
        AdminModalModule,
        ReactiveFormsModule,
        SlideTopLabelModule,
        NavMenuModule,
    ],
    providers: [
        ObjectInstallmentService
    ]
})
export class ObjectPurchaseModule { }
