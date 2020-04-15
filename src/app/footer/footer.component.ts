import { WindowScrollLocker } from '../commons/window-scroll-block';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector : 'app-footer',
    templateUrl : './footer.component.html',
    styleUrls : ['./footer.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class FooterComponent implements OnInit, OnDestroy {

    public isHidden: boolean;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private windowScrollLocker: WindowScrollLocker,
        private router: Router
    ) { }

    public ngOnInit() {

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    if (this.router.url === '/flats/plan' || this.router.url === '/flats/house') {
                        this.isHidden = true;
                        document.body.style.padding = '0';
                    } else {
                        this.isHidden = false;
                        document.body.style.padding = '0 0 93px';
                    }
                }
            });
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
