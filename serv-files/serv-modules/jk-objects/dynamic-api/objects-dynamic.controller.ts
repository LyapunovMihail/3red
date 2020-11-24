import { IFileRequest } from '../../utilits/image-saver.utilits';
import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsDynamicModel } from './objects-dynamic.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsDynamicController extends ObjectsDynamicModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/dynamic/id/:id/:year/:month', responseHandler(async(req) => {
            return await this.getSnippet(req.params.id, req.params.year, req.params.month);
        }));

        this.router.get('/jk-object/dynamic/id/:id/', responseHandler(async(req) => {
            return await this.getSnippets(req.params.id);
        }));
        this.router.get('/jk-object/dynamic/completed-object/:id/', responseHandler(async(req) => {
            return await this.getCompletedObject(req.params.id);
        }));

        this.router.post('/admin/jk-object/dynamic/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/jk-object/dynamic/image', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        this.router.get('/jk-object/dynamic/last/link/:objectId', responseHandler(async(req) => {
            return await this.getLastMonthValue(req.params.objectId);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
