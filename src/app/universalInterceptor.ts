import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

    constructor(@Optional() @Inject('serverUrl') protected serverUrl: string) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.serverUrl = `http://localhost:${4000}`;
        const serverReq = !this.serverUrl ? req : req.clone({
            url: `${this.serverUrl}${req.url}`
        });
        return next.handle(serverReq);
    }
}
