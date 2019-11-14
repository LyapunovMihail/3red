import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import { DynamicModel } from './dynamic.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';
import { Controller } from '@nestjs/common';

@Controller('/api')
export class DynamicController extends DynamicModel {

    public router = express.Router();

    constructor (
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/dynamic', responseHandler(async(req) => {
            return await this.getObjects();
        }));

        this.router.get('/dynamic/last/link', responseHandler(async(req) => {
            return await this.getLastMonthValue();
        }));

        this.router.post('/admin/dynamic/set', responseHandler(async(req) => {
            return await this.setObject(req.body);
        }));

        this.router.post('/admin/dynamic/update/description', responseHandler(async(req) => {
            return await this.changeDescription(req.body.id, req.body.description);
        }));

        this.router.post('/admin/dynamic/update/ready', responseHandler(async(req) => {
            return await this.changeReady(req.body.id, req.body.ready);
        }));

        this.router.post('/admin/dynamic/update/image_delete', responseHandler(async(req) => {
            return await this.deleteImage(req.body.id, req.body.image, req.body.type);
        }));

        this.router.post('/admin/dynamic/delete', responseHandler(async(req) => {
            return await this.deleteObject(req.body.id);
        }));

        this.router.post('/admin/dynamic/video/set', responseHandler(async(req) => {
            return await this.setVideo(req.body.id, req.body.origin);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/dynamic/image/set', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.setImages(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
