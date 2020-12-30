import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsModel } from './objects.model';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';
import { Controller } from '@nestjs/common';
import { Express } from 'express';
import { IFileRequest } from '../../utilits/image-saver.utilits';

@Controller('/api')
export class ObjectsController extends ObjectsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/object/id/:id', responseHandler(async (req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.get('/jk-object/object', responseHandler(async (req) => {
            return await this.getSnippetByParams(req.query);
        }));

        this.router.post('/admin/jk-object/object/create', responseHandler(async (req) => {
            return await this.setSnippet(req.body.form);
        }));

        this.router.post('/admin/jk-object/object/update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body.id, req.body.form);
        }));

        this.router.post('/admin/jk-object/object/delete', responseHandler(async (req) => {
            return await this.deleteSnippet(req.body.id);
        }));

        this.router.post('/admin/jk-object/object/update-collection', responseHandler(async (req) => {
            return await this.updateCollection(req.body.snippets);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/jk-object/object/image', multipartMiddleware, responseHandler(async (req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
