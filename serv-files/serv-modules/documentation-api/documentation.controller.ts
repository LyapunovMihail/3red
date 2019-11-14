import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import { DocumentationModel } from './documentation.model';
import { Express } from 'express-serve-static-core';
import * as multipart from 'connect-multiparty';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';

@Controller('/api')
export class DocumentaionController extends DocumentationModel {

    public router = express.Router();

    constructor(
      private mongoConnectionService: MongoConnectionService,
      private expressAppService: ExpressAppService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/documentation/list', responseHandler(async(req) => {
            return await this.getObjects();
        }));

        this.router.get('/documentation/header', responseHandler(async(req) => {
            return await this.getHeaderDescription();
        }));

        this.router.post('/admin/documentation/header/update', responseHandler(async(req) => {
            return await this.updateHeaderDescription(req.body.description);
        }));

        this.router.post('/admin/documentation/create', responseHandler(async(req) => {
            return await this.createObject();
        }));

        this.router.post('/admin/documentation/delete', responseHandler(async(req) => {
            return await this.deleteObject(req.body.id);
        }));

        this.router.post('/admin/documentation/update', responseHandler(async(req) => {
            return await this.updateObjectTitle(req.body.id, req.body.title);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/documentation/file/set', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadFile(req);
        }));

        this.router.post('/admin/documentation/file/delete', responseHandler(async(req: IFileRequest) => {
            return await this.deleteFile(req.body.id, req.body.file);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
