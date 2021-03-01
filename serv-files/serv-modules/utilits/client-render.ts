import {
    join,
} from 'path';
import * as mobileDetect from 'mobile-detect';
import { SERVER_CONFIGURATIONS } from '../configuration';
import {
    Request,
    Response,
} from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

export function ShouldSendMobileVersion(req, session) {
    return !(session && session.onlyDesktop) && (new mobileDetect(req.headers['user-agent'])).mobile();
}

export function clientRender(req: Request, res: Response, status: number, session) {
    if (!SERVER_CONFIGURATIONS.IS_DEVELOPMENT_MODE) {
        if (ShouldSendMobileVersion(req, session)) {
            const distFolder = join(process.cwd(), 'dist/mobile');
            const indexHtml = existsSync(join(distFolder, 'index-mobile.original.html')) ? 'index-mobile.original.html' : 'index-mobile';
            res.status(status).render(
                join(distFolder, indexHtml), { req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl }]}
            );
        } else {
            const distFolder = join(process.cwd(), 'dist/desktop');
            const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
            res.status(status).render(
                indexHtml, { req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl }]}
            );
        }
    } else {
        res.sendStatus(404);
    }
}
