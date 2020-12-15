import { responseHandler } from '../../utilits/response-handler.utilits';
import { AboutCareerModel } from './about-career.model';
import * as express from 'express';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';
import { Controller } from '@nestjs/common';
import { Express } from 'express';

@Controller('/api')
export class AboutCareerController extends AboutCareerModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService
    ) {
        super(MongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/about/career', responseHandler(async (req) => {
            return await this.getSnippet();
        }));

        this.router.post('/admin/about/career/create-update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
