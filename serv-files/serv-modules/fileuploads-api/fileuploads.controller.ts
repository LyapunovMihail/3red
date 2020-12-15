import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import { FileUploadsModel } from './fileuploads.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';

@Controller('/api')
export class FileUploadsController extends FileUploadsModel {

    public router = express.Router();

    constructor (
      private mongoConnectionService: MongoConnectionService,
      private expressAppService: ExpressAppService
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/files/:type', responseHandler(async(req) => {
            return await this.getSnippet(req.params.type);
        }));

        this.router.post('/admin/files/delete', responseHandler(async(req) => {
            return await this.deleteSnippet(req.body.id, req.body.type);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/files/set', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadFile(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
