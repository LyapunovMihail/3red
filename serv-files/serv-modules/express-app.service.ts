import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class ExpressAppService {

    static app: Express;

    getApp(): Express {
        return ExpressAppService.app;
    }

}
