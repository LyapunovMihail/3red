import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import { GalleryModel } from './gallery.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';

@Controller('/api')
export class GalleryController extends GalleryModel {

    public router = express.Router();

    constructor (
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/gallery', responseHandler(async(req) => {
            return await this.getSnippet(req.query);
        }));

        this.router.post('/admin/gallery/delete', responseHandler(async(req) => {
            return await this.deleteSnippet(req.body.id);
        }));

        this.router.post('/admin/gallery/update/description', responseHandler(async(req) => {
            return await this.changeDescription(req.body.id, req.body.description);
        }));

        this.router.post('/admin/gallery/update/name', responseHandler(async(req) => {
            return await this.changeName(req.body.id, req.body.name);
        }));

        this.router.post('/admin/gallery/update/type', responseHandler(async(req) => {
            return await this.changeType(req.body.id, req.body.type);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/gallery/image/create', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.setSnippet(req);
        }));

        this.router.post('/admin/gallery/image/update', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.updateImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
