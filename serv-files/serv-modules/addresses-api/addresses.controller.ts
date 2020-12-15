import * as express from 'express';
import { responseHandler } from './../utilits/response-handler.utilits';
import { AddressesModel } from './addresses.model';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';
import { Express } from 'express';

@Controller('/api')
export class AddressesController extends AddressesModel {

    public router = express.Router();

    constructor(private expressAppService: ExpressAppService,
                private mongoConnectionService: MongoConnectionService) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    public routing() {
        this.router.post('/search/object', responseHandler(async(req) => {
            return await this.getObjectsFlats(req.body.search);
        }));

        this.router.get('/search/object-data/:objectId', responseHandler(async(req) => {
            return await this.getObjectFlatsData(req.params.objectId);
        }));

        this.router.post('/search/common', responseHandler(async(req) => {
            return await this.getCommonFlats(req.body.search);
        }));

        this.router.get('/search/common-data', responseHandler(async(req) => {
            return await this.getCommonFlatsData(req.query);
        }));

        this.router.get('/search/config', responseHandler(async(req) => {
            return await this.getConfig(req.query);
        }));

        this.router.get('/favorites/get', responseHandler(async(req) => {
            return await this.getFavorites(req.session);
        }));

        this.router.post('/favorites/set', responseHandler(async(req) => {
            return await this.setFavorites(req.session, req.body.flat);
        }));

        this.router.post('/favorites/refresh', responseHandler(async(req) => {
            return await this.refreshFavorites(req.session, req.body.flats);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
