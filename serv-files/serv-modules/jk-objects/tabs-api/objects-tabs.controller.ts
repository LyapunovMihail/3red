import { responseHandler } from '../../utilits/response-handler.utilits';
import { ObjectsTabsModel } from './objects-tabs.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';

@Controller('/api')
export class ObjectsTabsController extends ObjectsTabsModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService,
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/jk-object/tabs/id/:id/gallery', responseHandler(async (req) => {
            return await this.getGalleryTabs(req.params.id);
        }));

        this.router.post('/admin/jk-object/tabs/gallery/create-update', responseHandler(async (req) => {
            return await this.updateGalleryTabs(req.body);
        }));

        this.router.get('/jk-object/tabs/id/:id/decoration', responseHandler(async (req) => {
            return await this.getDecorationTabs(req.params.id);
        }));

        this.router.post('/admin/jk-object/tabs/decoration/create-update', responseHandler(async (req) => {
            return await this.updateDecorationTabs(req.body);
        }));

        this.router.get('/jk-object/tabs/id/:id/location', responseHandler(async (req) => {
            return await this.getLocationTabs(req.params.id);
        }));

        this.router.post('/admin/jk-object/tabs/location/create-update', responseHandler(async (req) => {
            return await this.updateLocationTabs(req.body);
        }));

        this.router.get('/jk-object/tabs/id/:id/dynamic', responseHandler(async (req) => {
            return await this.getDynamicTabs(req.params.id);
        }));

        this.router.post('/admin/jk-object/tabs/dynamic/create-update', responseHandler(async (req) => {
            return await this.updateDynamicTabs(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
