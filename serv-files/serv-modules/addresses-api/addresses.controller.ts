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
            return await this.getFlats(req.body.search);
        }));
        this.router.get('/search/object', responseHandler(async(req) => {
            return await this.getObjectFlats(req.query);
        }));
        this.router.post('/search/common', responseHandler(async(req) => {
            return await this.getCommonFlats(req.body.search);
        }));
        this.router.post('/search/with_count', responseHandler(async(req) => {
            return await this.getObjectsWithCount(req.body.search);
        }));
        this.router.get('/search-config', responseHandler(async(req) => {
            return await this.getSearchConfig();
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
