import { responseHandler } from '../../utilits/response-handler.utilits';
import { AboutTeamModel } from './about-team.model';
import * as express from 'express';
import * as multipart from 'connect-multiparty';
import { MongoConnectionService } from '../../mongo-connection.service';
import { ExpressAppService } from '../../express-app.service';
import { Controller } from '@nestjs/common';
import { Express } from 'express';
import { IFileRequest } from '../../utilits/image-saver.utilits';

@Controller('/api')
export class AboutTeamController extends AboutTeamModel {

    public router = express.Router();

    constructor(
        private mongoConnectionService: MongoConnectionService,
        private expressAppService: ExpressAppService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {
        this.router.get('/about/team', responseHandler(async (req) => {
            return await this.getSnippets();
        }));

        this.router.post('/admin/about/team/create-update', responseHandler(async (req) => {
            return await this.updateSnippet(req.body);
        }));

        const multipartMiddleware = multipart();
        this.router.post('/admin/about/team/image/', multipartMiddleware, responseHandler(async(req: IFileRequest) => {
            return await this.uploadImage(req);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
