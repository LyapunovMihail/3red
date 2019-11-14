import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable( )

// Важно! Провайдер только в AppModule.
export class AuthorizationObserverService {

    // Здесь свойство subject статично не случайно)
    // Планируется подключать в провайдеры только один раз - в AppModule,
    // тогда сервайс будет общим для всех дочерних компонентов при использовании.
    // Но чтобы избежать недоразумений и поиска ошибки в будущем
    // ( пример : по ошибке подключить в провайдерс в другом компоненте/модуле ),
    // решил сделать свойство статичным, тогда в не зависимости от кол-ва созданных экземпляров
    // этого сервайса, свойство subject всегда будет одно на всех подписавшихся
    private static subject = new BehaviorSubject<boolean>(false);

    setAuthorization( val: boolean ) {
        AuthorizationObserverService.subject.next( val );
    }

    getAuthorization(): Observable<boolean> {
        return AuthorizationObserverService.subject.asObservable( );
    }
}
