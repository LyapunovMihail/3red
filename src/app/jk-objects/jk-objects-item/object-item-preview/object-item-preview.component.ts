import { Component, Input, OnInit } from '@angular/core';
import { mockInfo, mockCorpus } from './mock-info';

@Component({
    selector: 'app-object-item-preview',
    templateUrl: 'object-item-preview.component.html',
    styleUrls: ['object-item-preview.component.scss']
})

export class ObjectItemPreviewComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public mockSnippet = mockInfo;
    public mockDate = mockCorpus;

    constructor(
    ) { }

    ngOnInit() {
    }
}
