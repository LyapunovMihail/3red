import { Controller } from '@nestjs/common';
import { ExpressAppService } from '../express-app.service';
import { MongoConnectionService } from '../mongo-connection.service';
import { responseHandler } from './../utilits/response-handler.utilits';
import { ContactsModel } from './contacts.model';
import { Express } from 'express-serve-static-core';
import * as express from 'express';

@Controller('/api')
export class ContactsController extends ContactsModel {

    public router = express.Router();

    constructor(
        private expressAppService: ExpressAppService,
        private mongoConnectionService: MongoConnectionService
    ) {
        super(mongoConnectionService.getDb().connection.db);
        this.routing();
    }

    routing() {

        // get phone number
        this.router.get('/contacts/phone', responseHandler(async(req) => {
            return await this.getPhone();
        }));

        // update phone number
        this.router.post('/admin/contacts/phone', responseHandler(async(req) => {
            return await this.updatePhone(req.body.phone);
        }));

        // get mails
        this.router.get('/contacts/mail/get', responseHandler(async(req) => {
            return await this.getMail();
        }));

        // set mail
        this.router.post('/admin/contacts/mail/set', responseHandler(async(req) => {
            return await this.setMail();
        }));

        // delete mail
        this.router.post('/admin/contacts/mail/delete', responseHandler(async(req) => {
            return await this.deleteMail(req.body.mail_id);
        }));

        // update mails
        this.router.post('/admin/contacts/mail/update', responseHandler(async(req) => {
            return await this.updateMail(req.body.mail_id, req.body.mail_value, req.body.mail_status);
        }));

        const app: Express = this.expressAppService.getApp();
        app.use('/api', this.router);
    }
}
