import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search-mod-select',
    templateUrl: './mod-select.component.html',
    styleUrls: ['./mod-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ModSelectComponent),
            multi: true
        }
    ]
})

export class ModSelectComponent implements OnInit, OnChanges {

    @Input() public modList: { name: string, value: string }[];
    @Input() public value;
    selectedMods: string[] = [];
    public subscriptions: Subscription[] = [];

    constructor(
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {

        // this.route.queryParams.subscribe((params) => {
        //     if (params && params.mod) {
        //     this.selectedMods = params.mod.split(',');
        //     }
        // });
    }

    public ngOnChanges(changes: SimpleChanges) {
        if ('value' in changes) {
            this.selectedMods = changes.value.currentValue.split(',');
        }
    }

    public checkButtonActivate(value) {
        if (!value && this.selectedMods.length === 0) {
            return true;
        }
        return !!this.selectedMods.find(item => item === value);
    }

    public modNavigate(num: string) {
        if (!num) {
            this.selectedMods = [];
        } else {
            const index = this.selectedMods.indexOf(num);
            if (index === -1) {
                this.selectedMods.push(num);
            } else {
                this.selectedMods.splice(index, 1);
            }
        }

        this.propagateChange(this.selectedMods.toString());
    }

    public writeValue() {
    }

    public propagateChange = (_: any) => {
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

}
