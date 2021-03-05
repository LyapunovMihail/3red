import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SearchService } from '../search/search.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-popular',
    templateUrl: 'popular.component.html',
    styleUrls: ['./popular.component.scss'],
    providers: [
        SearchService
    ]
})

export class PopularComponent implements OnInit, OnDestroy {

    public metaTags;
    @Output() public close = new EventEmitter<boolean>();

    constructor(
        private searchService: SearchService,
        public scrollLock: WindowScrollLocker
    ) { }

    ngOnInit() {
        this.scrollLock.block();

        this.searchService.getMetaTags()
        .subscribe((tags) => {
                this.metaTags = tags;
            },
            (err) => console.log(err));
    }

    ngOnDestroy() {
        this.scrollLock.unblock();
    }
}
