import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsProjectModel } from './objects-project.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsProjectController extends ObjectsProjectModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/project/id/:id', responseHandler(async(req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.post('/admin/jk-object/project/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
