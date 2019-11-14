import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';

import { SharesModel } from './shares.model';
import { ExpressAppService } from '../express-app.service';
import { MongoConnectionService } from '../mongo-connection.service';
import { Controller } from '@nestjs/common';

@Controller('/api')
export class SharesController extends SharesModel {

    public router = express.Router();

    constructor(
      private expressAppService: ExpressAppService,
      private mongoConnectionService: MongoConnectionService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    public routing() {
        this.router.post('/admin/shares/create', responseHandler(async(req) => {
            return await this.createShare(req.body);
        }));

        this.router.get('/shares/list', responseHandler(async(req) => {
            return await this.getShares(Number(req.query.limit), Number(req.query.skip));
        }));

        this.router.get('/shares/id/:id', responseHandler(async(req) => {
            return await this.getShareById(req.params.id);
        }));

        this.router.post('/admin/shares/update', responseHandler(async(req) => {
            console.log(req.body.id);
            return await this.updateShare(req.body.id, req.body.obj);
        }));

        this.router.post('/admin/shares/delete', responseHandler(async(req) => {
            return await this.deleteShare(req.body.id);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/shares/image', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
