import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SeoService } from './seo.service';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-seo',
    templateUrl: './seo.component.html',
    styleUrls: ['./seo.component.scss']
})

export class SeoComponent implements OnInit, OnDestroy {

    public tagsArray = [];

    public isDisabled = false;

    public isAuthorizated: boolean = false ;
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor (
        private authorization: AuthorizationObserverService,
        private seoService: SeoService,
        private router: Router
    ) {}

    public ngOnInit() {
        this.authorization.getAuthorization()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((val) => {
                this.isAuthorizated = val;
                if (!val) {
                    this.router.navigate(['/']);
                    return;
                }
                this.getTags();
            });
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public setTag() {
        this.seoService.setTag()
            .subscribe(
                (data) => this.tagsArray = data,
                (error) => console.error(error)
            );
    }

    public removeTag(id) {
        this.seoService.deleteTag(id)
            .subscribe(
                (data) => this.tagsArray = data,
                (error) => console.error(error)
            );
    }

    public getTags() {
        this.seoService.getTags()
            .subscribe(
                (data) => this.tagsArray = data,
                (error) => console.error(error)
            );
    }

    public updateTag(options, type) {
        this.isDisabled = true;

        if (type === 'name' || type === 'content') {
            options.meta[options.ind][type] = options[type].target.value;
        } else if (type === 'flatsPopularCategory') {
            options[type] = options[type];
        } else {
            options[type] = options[type].target.value;
        }

        this.seoService.updateTag(options)
            .subscribe(
                (data) => {
                    this.isDisabled = false;
                    this.tagsArray = data;
                },
                (error) => console.error(error)
            );
    }

    public pushTag(options) {
        this.isDisabled = true;
        this.seoService.pushTag(options)
            .subscribe(
                (data) => {
                    this.isDisabled = false;
                    this.tagsArray = data;
                },
                (error) => console.error(error)
            );
    }

    public popTag(options) {
        this.isDisabled = true;
        this.seoService.popTag(options)
            .subscribe(
                (data) => {
                    this.isDisabled = false;
                    this.tagsArray = data;
                },
                (error) => console.error(error)
            );
    }
}
