import * as express from 'express';
import { responseHandler } from './../utilits/response-handler.utilits';
import { Controller } from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';
import { ExpressAppService } from '../express-app.service';
import { Express } from 'express';
import { EmailerModel } from './emailer.model';

@Controller('/api')
export class EmailerController extends EmailerModel {

    public router = express.Router();

    constructor(private expressAppService: ExpressAppService,
                private mongoConnectionService: MongoConnectionService) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.post('/request_form/call', responseHandler(async(req) => {
            return await this.callRequest(req.body);
        }));
        this.router.post('/request_form/credit', responseHandler(async(req) => {
            return await this.creditRequest(req.body);
        }));
        this.router.post('/request_form/reserve', responseHandler(async(req) => {
            return await this.reserveRequest(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
