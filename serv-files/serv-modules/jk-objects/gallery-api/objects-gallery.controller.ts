import { IFileRequest } from '../../utilits/image-saver.utilits';
import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsGalleryModel } from './objects-gallery.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsGalleryController extends ObjectsGalleryModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/gallery/id/:id/tab/:tab', responseHandler(async(req) => {
            return await this.getSnippet(req.params.id, req.params.tab);
        }));

        this.router.post('/admin/jk-object/gallery/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        this.router.post('/admin/jk-object/gallery/update', responseHandler(async(req) => {
            return await this.removeTabSlides(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/jk-object/gallery/image', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
