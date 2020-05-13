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
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/about/docs', responseHandler(async (req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.post('/about/docs/create-update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/about/docs/file/set', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadFile(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
