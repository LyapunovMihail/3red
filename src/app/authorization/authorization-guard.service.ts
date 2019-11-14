import { Injectable } from '@angular/core';
import { AuthorizationObserverService } from './authorization.observer.service';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private auth: AuthorizationObserverService,
        private router: Router
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.getAuthorization().pipe(first((auth) => {
            if (auth) {
                return true;
            }
            this.router.navigateByUrl('/');
            return false;
        }));
    }
}
