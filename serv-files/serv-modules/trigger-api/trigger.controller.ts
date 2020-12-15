import * as express from 'express';
import { responseHandler } from './../utilits/response-handler.utilits';
import { TriggerModel } from './trigger.model';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';
import { Express } from 'express';

@Controller('/api')
export class TriggerController extends TriggerModel {

    public router = express.Router();

    constructor(private expressAppService: ExpressAppService,
                private mongoConnectionService: MongoConnectionService) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    public routing() {
        this.router.get('/trigger', responseHandler(async(req) => {
            return await this.getSnippet();
        }));
        this.router.post('/admin/trigger/update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body.id, req.body.key, req.body.value);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
