import { Component } from '@angular/core';

@Component({
    selector: 'app-purchase',
    styleUrls: ['./purchase.component.scss'],
    template: `
        <section class="purchase">
            <div class="purchase__container">
                <h1 class="purchase__title">Условия покупки</h1>
                <div class="purchase__descr">
                    <p>Продажа в ЖК осуществляется через эскроу-счета.</p>
                    <p>Эскроу-счет в долевом строительстве – это специальный счет, открываемый в банке,
                        на котором замораживаются деньги дольщика на период строительства дома, и передаются Застройщику только после того, как тот исполнит свои обязательства
                        перед дольщиком. Применение эскроу счетов регламентируется законом в ст. 860.7 ГК РФ.</p>
                </div>

                <div class="purchase__links">
                    <a class="purchase__links-item" [routerLinkActive]="['purchase__links-item_active']" routerLink="/purchase/credit">Ипотека</a>
                    <a class="purchase__links-item" [routerLinkActive]="['purchase__links-item_active']" routerLink="/purchase/installment">Рассрочка</a>
                </div>
            </div>

            <router-outlet></router-outlet>
        </section>
    `
})

export class PurchaseComponent {

    constructor() {
    }
}
