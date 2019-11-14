import {
    Controller,
    Get, Param,
    Req,
    Res, Session,
} from '@nestjs/common';
import {
    clientRender
} from '../utilits/client-render';

@Controller()
export class PagesController {

    @Get('/api/agent/:device')
    setDevice(@Param('device') device, @Req() req, @Res() res, @Session() session) {
        session.onlyDesktop = ( device === 'desktop' ) ? true : false;
        res.json({result: 'ok'});
    }

    @Get('*')
    renderPage(@Req() req, @Res() res, @Session() session) {
        clientRender(req, res, 200, session);
    }
}
