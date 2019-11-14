import {
    join,
} from 'path';
import * as mobileDetect from 'mobile-detect';
import { SERVER_CONFIGURATIONS } from '../configuration';
import {
    Request,
    Response,
} from 'express';

export function ShouldSendMobileVersion(req, session) {
    return !(session && session.onlyDesktop) && (new mobileDetect(req.headers['user-agent'])).mobile();
}

export function clientRender(req: Request, res: Response, status: number, session) {
    if (!SERVER_CONFIGURATIONS.IS_DEVELOPMENT_MODE) {
        if (ShouldSendMobileVersion(req, session)) {
            res.status(status).sendFile(
              join(SERVER_CONFIGURATIONS.DIST_FOLDER, '../', 'dist', 'mobile', 'index-mobile.html'),
            );
        } else {
            res.status(status).sendFile(
              join(SERVER_CONFIGURATIONS.DIST_FOLDER, '../', 'dist', 'desktop', 'index.html'), {
                  req,
                  res,
                  async: true,
                  preboot: true,
              },
            );
        }
    } else {
        res.sendStatus(404);
    }
}
