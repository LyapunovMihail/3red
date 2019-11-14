import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

/* Создал этот сервис для реализации перехода в поиск квартир по параметрам по ссылкам с параметрами запроса.
    Так как нужно инициировать запрос на открытие панели поиска, и через пол секунды таймаута передать параметры запроса,
    переход по ссылке обычными средствами невозможен.
 */

@Injectable ()

export class SearchFlatsLinkHandlerService {

    public showSearchPanel = new Subject<boolean>();

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public linkHandle(show, query) {
        this.router.navigate(['/flats/plan']); // Сначала переходим в компонент плана

        setTimeout(() => {  // Затем инициируем открытие панели поиска
            this.showSearchPanel.next(show);
        }, 0);

        setTimeout(() => { // затем выдерживаем пол секунды чтобы успела прогрузиться анимация и передаём параметры запроса
            const queryParams = {...this.activatedRoute.snapshot.queryParams, ...query};
            this.router.navigate(['/flats/plan'], {queryParams});
        }, 550);
    }

    public getShowSearchPanel() {
        return this.showSearchPanel.asObservable();
    }
}
