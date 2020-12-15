import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsFlatModel } from './objects-flat.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsFlatController extends ObjectsFlatModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/flat/id/:id', responseHandler(async(req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.post('/admin/jk-object/flat/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
