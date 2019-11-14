import { PurchaseInstallmentService } from './purchase-installment/purchase-installment.service';
import { PurchaseInstallmentNumberPipe } from './purchase-installment/purchase-installment.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GHMRangetNumberModule } from './purchase-installment/ghm-range-number/ghm-range-number.module';
import { PurchaseCreditComponent } from './purchase-credit/purchase-credit.component';
import { PurchaseInstallmentComponent } from './purchase-installment/purchase-installment.component';
import { PurchaseComponent } from './purchase.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PurchaseCreditComponents } from './purchase-credit/credit';

const PurchaseComponents = [
    PurchaseComponent,
    PurchaseInstallmentComponent,
    PurchaseInstallmentNumberPipe,
    ...PurchaseCreditComponents
];

@NgModule({
    exports: [
        ...PurchaseComponents
    ],
    declarations: [
        ...PurchaseComponents
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        GHMRangetNumberModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild([
            { path: 'purchase', component: PurchaseComponent,
                children: [
                    { path: '', redirectTo: 'credit', pathMatch: 'full' },
                    { path: 'credit', component: PurchaseCreditComponent },
                    { path: 'installment', component: PurchaseInstallmentComponent }
                ]}
        ])
    ],
    providers: [
        PurchaseInstallmentService,
        PurchaseInstallmentNumberPipe
    ]
})

export class PurchaseModule { }
