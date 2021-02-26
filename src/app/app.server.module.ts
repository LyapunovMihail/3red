import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalInterceptor } from './universalInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        /* Multi is important or you will delete all the other interceptors */
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
