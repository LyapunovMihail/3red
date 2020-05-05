import { responseHandler } from '../../utilits/response-handler.utilits';
import { HomeInfoModel } from './home-info.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class HomeInfoController extends HomeInfoModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/home/info', responseHandler(async(req) => {
            return await this.getSnippet();
        }));

        this.router.post('/admin/home/info/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
