import { Injectable } from '@angular/core';

@Injectable()

export class ObjectFlatsService {

    public data: {jk, housesBtnList, floorCount, config};
    public objectId: string;

    constructor() { }

    public setId(id) {
        this.objectId = id;
    }
    public getId() {
        return this.objectId;
    }
    public setData(data) {
        this.data = data;
    }
    public getData() {
        return this.data;
    }
}
