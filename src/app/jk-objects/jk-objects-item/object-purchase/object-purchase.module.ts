import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectInstallmentComponent } from './installment/object-installment.component';
import { ObjectInstallmentPipe } from './installment/object-installment.pipe';
import { GHMRangetNumberModule } from './installment/ghm-range-number/ghm-range-number.module';
import { ObjectPurchaseComponent } from './object-purchase.component';
import { ObjectInstallmentService } from './installment/object-installment.service';
import { ObjectCreditOutputComponent } from './credit-output/object-credit-output.component';

@NgModule({
    exports: [
        ObjectPurchaseComponent,
        ObjectCreditOutputComponent,
        ObjectInstallmentComponent,
        ObjectInstallmentPipe
    ],
    declarations: [
        ObjectPurchaseComponent,
        ObjectCreditOutputComponent,
        ObjectInstallmentComponent,
        ObjectInstallmentPipe
    ],
    imports: [
        CommonModule,
        GHMRangetNumberModule
    ],
    providers: [
        ObjectInstallmentService
    ]
})
export class ObjectPurchaseModule { }
