import { IFileRequest } from './../utilits/image-saver.utilits';
import { responseHandler } from './../utilits/response-handler.utilits';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { NewsModel } from './news.model';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';
import { Express } from 'express';

@Controller('/api')
export class NewsController extends NewsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {

        this.router.get('/news/all', responseHandler(async (req) => {
            return await this.getSnippet();
        }));

        this.router.get('/news/id/:id', responseHandler(async (req) => {
            return await this.getSnippet(req.params.id);
        }));

        this.router.get('/news/main', responseHandler(async (req) => {
            return await this.getMainSnippet();
        }));

        this.router.post('/admin/news/create', responseHandler(async (req) => {
            return await this.setSnippet(req.body.form);
        }));

        this.router.post('/admin/news/update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body.id, req.body.form);
        }));

        this.router.post('/admin/news/delete', responseHandler(async (req) => {
            return await this.deleteSnippet(req.body.id);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/news/image', multipartMiddleware, responseHandler(async (req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
