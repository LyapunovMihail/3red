import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecorationService, IDecorationList } from '../decoration.service';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-decoration-variation',
    templateUrl: './decoration-variation.component.html',
    styleUrls: ['./decoration-variation.component.scss'],
    providers: [DecorationService]
})

export class DecorationVariationComponent implements OnInit, OnDestroy {

    public routerEvents: Subscription;
    public pageType: string;
    public decorationList: IDecorationList[];

    constructor(
        private decorationService: DecorationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit() {
        this.decorationList = this.decorationService.getDecorationItems();

        this.defineType();

        this.routerEvents = this.router.events
            .pipe(filter((router) => (router instanceof NavigationEnd)), map((router: NavigationEnd) => router.url))
            .subscribe((router) => {
                this.defineType();
            });
    }

    public ngOnDestroy() {
        this.routerEvents.unsubscribe();
    }

    public defineType() {
        this.pageType = this.activatedRoute.snapshot.params['type'];
        if (!this.reviuseUrlType(this.pageType) && this.pageType !== undefined) {
            this.router.navigate(['/error-404'], { skipLocationChange: true });
        }
    }

    public reviuseUrlType(urlType) {
        return this.decorationList.some((item) => (item.mod === urlType));
    }
}
