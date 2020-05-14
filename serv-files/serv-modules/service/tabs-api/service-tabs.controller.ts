import { responseHandler } from '../../utilits/response-handler.utilits';
import { ServiceTabsModel } from './service-tabs.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ServiceTabsController extends ServiceTabsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/service/tabs', responseHandler(async (req) => {
            return await this.getTeamTabs();
        }));

        this.router.post('/admin/service/tabs/create-update', responseHandler(async (req) => {
            return await this.updateTeamTabs(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
