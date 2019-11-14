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
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    public routing() {
        this.router.post('/search', responseHandler(async(req) => {
            return await this.getObjects(req.body.search);
        }));
        this.router.get('/search', responseHandler(async(req) => {
            return await this.getObjects(req.query);
        }));
        this.router.post('/search/with_count', responseHandler(async(req) => {
            return await this.getObjectsWithCount(req.body.search);
        }));
        this.router.get('/search-config', responseHandler(async(req) => {
            return await this.getSearchConfig();
        }));
        this.router.post('/search/by_houses_and_numbers', responseHandler(async(req) => {
            return await this.getObjectsByHousesAndNumbers(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
