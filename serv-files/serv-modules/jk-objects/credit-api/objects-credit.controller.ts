import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsCreditModel } from './objects-credit.model';
import * as express from 'express';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';
import { Controller } from '@nestjs/common';
import { Express } from 'express';

@Controller('/api')
export class ObjectsCreditController extends ObjectsCreditModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/credit/id/:id', responseHandler(async (req) => {
            return await this.getSnippet(req.params.id);
        }));


        this.router.post('/admin/jk-object/credit/create-update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
