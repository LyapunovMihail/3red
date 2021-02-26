import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoConnectionService } from './mongo-connection.service';
import { ExpressAppService } from './express-app.service';
import { SERVER_CONFIGURATIONS } from './configuration';
import * as session from 'express-session';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { DbCronUpdate } from './utilits/db-cron-update.utils';
import { ROUTES } from './rendering.routes';
import { clientRender } from './utilits/client-render';

export async function bootstrap(appExpress) {
    appExpress.use(bodyParser.json());
    appExpress.use(session({
        secret: '3red',
        resave: false,
        saveUninitialized: true
    }));

    ExpressAppService.app = appExpress;
    const db = await MongoConnectionService.connect();
    const app: any = await NestFactory.create(AppModule, appExpress);
    app.useStaticAssets(join(SERVER_CONFIGURATIONS.DIST_FOLDER, 'dist', 'mobile'), { index: false });
    app.useStaticAssets(join(SERVER_CONFIGURATIONS.DIST_FOLDER, 'dist', 'desktop'), { index: false });

    ROUTES.forEach((route: any) => {
        if (route.handle) {
            appExpress.get(route.url, route.handle);
        }
        appExpress.get(route.url || route, (req: any, res) => {
            clientRender(req, res, 200, req.session);
        });
    });

    setTimeout(() => {
        new DbCronUpdate(db.connection);
    });
    return app;
}
