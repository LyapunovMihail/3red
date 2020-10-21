import { responseHandler } from '../../utilits/response-handler.utilits';
import { PartnersTabsModel } from './partners-tabs.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class PartnersTabsController extends PartnersTabsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/partners/tabs', responseHandler(async (req) => {
            return await this.getTeamTabs();
        }));

        this.router.post('/admin/partners/tabs/create-update', responseHandler(async (req) => {
            return await this.updateTeamTabs(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
