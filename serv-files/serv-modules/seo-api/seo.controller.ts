import { Controller } from '@nestjs/common';
import { ExpressAppService } from '../express-app.service';
import { MongoConnectionService } from '../mongo-connection.service';
import { responseHandler } from './../utilits/response-handler.utilits';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { SeoModel } from './seo.model';

@Controller('/api')
export class SeoController extends SeoModel {

    public router = express.Router();

    constructor(
        private expressAppService: ExpressAppService,
        private mongoConnectionService: MongoConnectionService
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        // get metas common
        this.router.get('/meta_get_common' , responseHandler(async(req) => {
            return await this.getTagsCommon({url : req.query.url});
        }));
        // get tags admin
        this.router.post('/admin/meta_get', responseHandler(async(req) => {
            return await this.getTags({});
        }));
        // create empty tag
        this.router.post('/admin/meta_set', responseHandler(async(req) => {
            return await this.setTag();
        }));
        // create tag with data
        this.router.post('/admin/meta_create', responseHandler(async(req) => {
            return await this.createTag(req.body);
        }));
        // delete tags
        this.router.post('/admin/meta_delete', responseHandler(async(req) => {
            return await this.deleteTag(req);
        }));
        // update tag
        this.router.post('/admin/meta_update', responseHandler(async(req) => {
            return await this.updateTag(req.body);
        }));
        // push meta tag
        this.router.post('/admin/meta_push', responseHandler(async(req) => {
            return await this.pushTag(req.body);
        }));
        // pull meta tag
        this.router.post('/admin/meta_pop', responseHandler(async(req) => {
            return await this.popTag(req.body);
        }));
        this.router.get('/meta_get_flats-search-tag' , responseHandler(async(req) => {
            return await this.getFlatsSearchTag();
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
