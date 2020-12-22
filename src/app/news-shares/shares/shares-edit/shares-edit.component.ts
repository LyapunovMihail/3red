import { Subject, Subscription } from 'rxjs';
import { FlatsDiscountService } from '../../../commons/flats-discount.service';
import { SharesService } from '../shares.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {
    Share,
    SHARES_CREATE_ID,
    SHARES_UPLOADS_PATH,
    ShareBodyBlock,
    ShareFlat,
    ShareFlatDiscountType
} from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-shares-edit',
    templateUrl: './shares-edit.component.html',
    styleUrls: ['./shares-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class SharesEditComponent implements OnInit, OnDestroy {

    public form: FormGroup;

    public uploadsPath: string;

    public dateNow: string;

    @Input() isForm = false;

    @Input() redactId: any;

    @Input() objectId = '';
    @Input() objectName = '';
    @Input() objectMod = '';

    public modsBtnList: IObjectSnippet | any;

    // вызывается при изменении сниппета
    @Output() snippetsChange = new EventEmitter();

    @Output() close = new EventEmitter();

    private subs: Subscription[] = [];
    private _ngUnsubscribe: Subject<any> = new Subject();

    public showModal = false;
    public modalAnchorData;

    constructor(
        private activeRoute: ActivatedRoute,
        private sharesService: SharesService,
        private flatsDiscountService: FlatsDiscountService
    ) {
        this.uploadsPath = SHARES_UPLOADS_PATH;
        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required])),
            text: new FormControl('', Validators.required),
            mainImage: new FormControl(null, Validators.required),
            mainThumbnail: new FormControl(null, Validators.required),
            show_on_main: new FormControl(false, Validators.required),
            show_on_promo: new FormControl(false, Validators.required),
            publish: new FormControl(false),
            created_at: new FormControl('', Validators.required),
            countdown: new FormControl(false, Validators.required),
            finish_date: new FormControl('', Validators.required),
            objectId: new FormControl(''),
            objectName: new FormControl(''),
            objectMod: new FormControl(''),
            shareCount: new FormControl({vk: 0, fb: 0, ok: 0}),
            body: new FormArray([])
        });

        moment.locale('ru');
    }

    public createDynamicNewsObj(): Share {
        return ({
            name: '',
            text: '',
            mainImage: null,
            mainThumbnail: null,
            countdown: false,
            show_on_main: false,
            show_on_promo: false,
            publish: false,
            created_at: new Date().toISOString(),
            finish_date: new Date().toISOString(),
            body: [],
            objectId: this.objectId,
            objectName: this.objectName,
            objectMod: this.objectMod,
            shareCount: {vk: 0, fb: 0, ok: 0}
        });
    }

    // ToDo Создать селект с названиями-айдишниками объектов жк из modsBtnList

    ngOnInit() {
        this.getModBtns();

        if (this.redactId === SHARES_CREATE_ID) {
            this.form.reset(this.createDynamicNewsObj());
        } else {
            this.getObjectById();
        }

        this.setShowOnMain({isFinishDateChange: true});

        this.dateNow = moment(Date.now()).format('LL').slice(0, -3);
    }

    // tslint:disable-next-line:member-access
    ngOnDestroy() {
        this.unsubscribe();
    }

    public getModBtns() {
        this.sharesService.getSnippets()
            .subscribe(
                (data) => {
                    this.modsBtnList = data;
                    this.modsBtnList.unshift({name: '', mod: '', _id: ''});
                },
                (err) => console.error(err)
            );
    }

    public changeMod(e) {
        const selectedValue = this.modsBtnList[e.target.selectedIndex];
        this.form.get('objectId').setValue(selectedValue._id);
        this.form.get('objectName').setValue(selectedValue.name);
        this.form.get('objectMod').setValue(selectedValue.mod);
    }

    showModalFunc(obj, i) {
        this.showModal = true;
        obj.formControl = this.body.at(i);
        this.modalAnchorData = obj;
    }

    public get body(): FormArray {
        return this.form.get('body') as FormArray;
    }

    public addDescription(order?: number, value?: string) {
        this.body.push(new FormControl({
            blockType: 'description',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockDescription: value ? value : ''
        }));
    }

    public addImage(order?: number, obj?: object) {
        this.body.push(new FormControl({
            blockType: 'image',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockImg: obj ? obj : {
                image: '',
                thumbnail: ''
            }
        }));
    }

    public addTitle(order?: number, value?: string) {
        this.body.push(new FormControl({
            blockType: 'title',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockTitle: value ? value : ''
        }));
    }

    public addFlats(order?: number, value?: ShareFlat) {
        this.body.push(new FormControl({
            blockType: 'flats',
            blockOrderNumber: order ? order : this.body.controls.length,
            blockFlat: value
                ? value
                : {
                    mod: null,
                    jkName: null,
                    jkId: null,
                    deliveryDate: null,
                    house: null,
                    flat: null,
                    section: null,
                    floor: null,
                    space: null,
                    rooms: null,
                    decoration: null,
                    decorationName: null,
                    scheme: null,
                    price: null,
                    discount: '',
                    discountType: ShareFlatDiscountType.SUM,
                    article: null,
                    articleId: null
                }
        }));
    }

    public changeBlockImage(data, i) {
        this.body.at(i).setValue({
            blockType: 'image',
            blockOrderNumber: this.body.at(i).value.blockOrderNumber,
            blockImg: {
                image: data.image,
                thumbnail: data.thumbnail
            }
        });
    }

    public removeBlock(cnt) {
        if (confirm('Удалить секцию?')) {
            this.body.removeAt(cnt);
        }
    }

    public moveBlock(array, i, dir) {
        let arr = this.form.value.body;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    public getObjectById() {
        this.sharesService.getShareById(this.redactId).subscribe((data: Share[]) => {
            this.form.reset(data[0]);
            console.log('start');
            (data[0].body as ShareBodyBlock[]).forEach((body: ShareBodyBlock) => {
                if (body.blockType === 'flats') {
                    this.addFlats(body.blockOrderNumber, body.blockFlat);
                } else if (body.blockType === 'title') {
                    this.addTitle(body.blockOrderNumber, body.blockTitle);
                } else if (body.blockType === 'image') {
                    this.addImage(body.blockOrderNumber, body.blockImg);
                } else if (body.blockType === 'description') {
                    this.addDescription(body.blockOrderNumber, body.blockDescription);
                }
            });
            this.setShowOnMain({ isFinishDateChange: true });
            console.log('form.value: ', this.form.value);
        });
    }

    public onImagePicked(e: Event, type: string, i): void {
        const file = (e.target as HTMLInputElement).files[0];
        this.sharesService.imageUpload(file)
            .then((data: any) => {
                if (type === 'main-image') {
                    this.form.patchValue({mainImage: data.image});
                    this.form.patchValue({mainThumbnail: data.thumbnail});
                } else if (type === 'change-image' && i !== undefined) {
                    this.changeBlockImage(data, i);
                } else {
                    this.addImage(this.body.controls.length, {
                        image: data.image,
                        thumbnail: data.thumbnail
                    });
                }
            }).catch((err) => {
            alert('Что-то пошло не так!');
            console.error(err);
        });
    }

    deleteImage() {
        this.form.patchValue({mainImage: ''});
        this.form.patchValue({mainThumbnail: ''});
    }

    public onSave(form): void {
        form.publish = !(form.publish === 'false' || form.publish === false);

        if (this.redactId === SHARES_CREATE_ID) {
            this.sharesService.createShare(form).subscribe(
                (response) => {
                    this.close.emit();
                    this.snippetsChange.emit(response);
                    this.flatsDiscountService.getShares(); // обновляем список акций в сервисе для определения скидки на квартиры по акциям
                },
                (err) => {
                    alert('Что-то пошло не так!');
                });
        } else {
            this.sharesService.updateShare(this.redactId, form as Share)
                .subscribe(
                    (response) => {
                        this.close.emit();
                        this.snippetsChange.emit(response);
                        this.flatsDiscountService.getShares(); // обновляем список акций в сервисе для определения скидки на квартиры по акциям
                    },
                    (err) => {
                        alert('Что-то пошло не так!');
                    }
                );
        }
    }

    get publish(): FormControl {
        return this.form.get('publish') as FormControl;
    }

    get showOnMain(): FormControl {
        return this.form.get('show_on_main') as FormControl;
    }

    get countdown(): FormControl {
        return this.form.get('countdown') as FormControl;
    }

    get finishDate(): FormControl {
        return this.form.get('finish_date') as FormControl;
    }

    get countdownDays() {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(this.finishDate.value);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public setShowOnMain(options: {isCountDownChange?: boolean, isFinishDateChange?: boolean, isPublishChange?: boolean }) {
        if (options.isCountDownChange || options.isFinishDateChange) {
            this.countDownOrFinishDateChange();
        }
        if (options.isPublishChange) {
            this.publishChange();
        }
    }

    private countDownOrFinishDateChange() {
        if (this.countdown.value && this.countdownDays < 0) {
            this.showOnMain.setValue(false);
        }
    }
    private publishChange() {
        if (this.publish.value === 'false') {
            this.showOnMain.setValue(false);
            this.form.updateValueAndValidity();
        }
    }

    private unsubscribe() {
        this._ngUnsubscribe.next();
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }
}
