import { responseHandler } from '../../utilits/response-handler.utilits';
import { PartnersModel } from './partners.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';
import { IFileRequest } from '../../utilits/image-saver.utilits';

@Controller('/api')
export class PartnersController extends PartnersModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/partners/tab/:tab', responseHandler(async(req) => {
            return await this.getSnippet(req.params.tab);
        }));

        this.router.post('/admin/partners/create-update', responseHandler(async(req) => {
            return await this.updateSnippet(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/partners/image', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
