import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HomePreviewService {

    constructor (
        private http: HttpClient
    ) { }


}
