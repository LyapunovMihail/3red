import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IRoutesMarks } from '../../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';

@Component({
    selector: 'app-location-routes-admin',
    templateUrl: './routes-admin.component.html',
    styleUrls: ['./routes-admin.component.scss']
})
export class RoutesAdminComponent implements OnInit {

    @Output()
    public routesMarksChange = new EventEmitter();
    @Input()
    public routesMarks: IRoutesMarks[];

    public form: FormGroup;
    public formArray: FormArray;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        if (this.routesMarks.length) {
            this.setRoutesMarksFromSnippet();
        } else {
            this.formArray = this.formBuilder.array([]);
        }
        this.form = this.formBuilder.group({
            routesMarks: this.formArray
        });

        this.form.valueChanges.subscribe((value) => {
            this.routesMarksChange.emit(value.routesMarks);
        });
    }

    private setRoutesMarksFromSnippet() {
        this.formArray = this.formBuilder.array(this.routesMarks.map((item) => {
            return this.formBuilder.group({
                type: item.type,
                size: [item.size],
                offset: [item.offset],
                zIndex: item.zIndex,
                content: item.content,
                route: item.route,
                coords: item.coords,
                place: item.place,
                info: item.info,
                name: item.name
            });
        }));
    }

    public pushMark() {
        this.formArray.push(this.formBuilder.group({
            type: 'auto',
            size: [[30, 46]], // оборачиваем массив [30, 46] в дополнительный массив, так как ангулар думает, что [40, 46] - это new FormControl, где 40 - Значение, а 46 - validator
            offset: [[0, -20]],
            zIndex: 0,
            content: this.formArray.length,
            route: {
                origin: '', // Начало линии откуда простраивается путь
                color: 'rgba(90,49,197,.6)',
                activeColor: 'rgb(90,49,197)',
                strokeStyle: '1 0' // первая цифра - длина штриха, вторая - длина пробела
            },
            coords: '',
            place: '',
            info: '',
            name: ''
        }));
        console.log('this.form: ', this.form);
    }

    public popMark(i) {
        this.formArray.removeAt(i);
    }

}
