import { responseHandler } from '../../utilits/response-handler.utilits';
import { TeamTabsModel } from './team-tabs.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class TeamTabsController extends TeamTabsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/about/team/tabs', responseHandler(async (req) => {
            return await this.getTeamTabs();
        }));

        this.router.post('/admin/about/team/tabs/create-update', responseHandler(async (req) => {
            return await this.updateTeamTabs(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
