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

    // @Get(
    //     '/' ||
    //     '/about' ||
    //     '/partners' ||
    //     '/contacts' ||
    //     '/news-shares/all' ||
    //     '/news-shares/news/list' ||
    //     '/news-shares/news/list/:id' ||
    //     '/news-shares/shares/list' ||
    //     '/news-shares/shares/list/:id' ||
    //     '/flats/search' ||
    //     '/objects/list' ||
    //     '/objects/list/:id' ||
    //     '/objects/list/:id/dynamic/:year/:month' ||
    //     '/objects/list/:id/flats' ||
    //     '/objects/list/:id/flats/house/:house' ||
    //     '/objects/list/:id/flats/house/:house/section/:section/floor/:floor' ||
    //     '/objects/list/:id/flats/house/:house/section/:section/floor/:floor/apartment/:apartment' ||
    //     '/favorites')
    // renderPage(@Req() req, @Res() res, @Session() session) {
    //     clientRender(req, res, 200, session);
    // }

    @Get('*')
    render404Page(@Req() req, @Res() res, @Session() session) {
        console.log('req.url: ', req.url);
        clientRender(req, res, 404, session);
    }
}
