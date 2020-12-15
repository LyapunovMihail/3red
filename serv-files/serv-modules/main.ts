import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoConnectionService } from './mongo-connection.service';
import * as express from 'express';
import { Express } from 'express';
import { ExpressAppService } from './express-app.service';
import { SERVER_CONFIGURATIONS } from './configuration';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { DbCronUpdate } from './utilits/db-cron-update.utils';
import * as session from 'express-session';
import { ROUTES } from './pages/rendering.routes';
import { clientRender } from './utilits/client-render';

async function bootstrap() {
    const appExpress: Express = express();
    appExpress.use(bodyParser.json());
    appExpress.use(session({
        secret: '3red',
        resave: false,
        saveUninitialized: true,
    }));
    ExpressAppService.app = appExpress;
    const db = await MongoConnectionService.connect();
    const app = await NestFactory.create(AppModule, appExpress);

    app.useStaticAssets(join(SERVER_CONFIGURATIONS.DIST_FOLDER, '../', 'dist', 'mobile'), { index: false });
    app.useStaticAssets(join(SERVER_CONFIGURATIONS.DIST_FOLDER, '../', 'dist', 'desktop'), { index: false });
    setTimeout(() => {
        new DbCronUpdate(db.connection);
    });

    ROUTES.forEach((route: any) => {
        if (route.handle) {
            appExpress.get(route.url, route.handle);
        }
        appExpress.get(route.url || route, (req: any, res) => {
            clientRender(req, res, 200, req.session);
        });
    });
    await app.listen(SERVER_CONFIGURATIONS.PORT);
}
bootstrap();
