import { IFileRequest } from '../../utilits/image-saver.utilits';
import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsDocumentationModel } from './objects-documentation.model';
import { Express } from 'express-serve-static-core';
import * as multipart from 'connect-multiparty';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsDocumentaionController extends ObjectsDocumentationModel {

    public router = express.Router();

    constructor(
      private mongoConnectionService: MongoConnectionService,
      private expressAppService: ExpressAppService
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/docs/id/:id', responseHandler(async (req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.post('/admin/jk-object/docs/create-update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/jk-object/docs/file/set', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadFile(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
