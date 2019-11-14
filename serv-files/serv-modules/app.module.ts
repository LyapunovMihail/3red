import { Module } from '@nestjs/common';
import { ContactsController } from './contacts-api/contacts.controller';
import { MongoConnectionService } from './mongo-connection.service';
import { AuthorizationController } from './authorization-api/authorization.controller';
import { NewsController } from './news-api/news.controller';
import { AddressesController } from './addresses-api/addresses.controller';
import { EmailerController } from './emailer-api/emailer.controller';
import { ExpressAppService } from './express-app.service';
import { PagesController } from './pages/pages.controller';
import { UploadsController } from './uploads/uploads.controller';
import { CreditController } from './credit-api/credit.controller';
import { DynamicController } from './dynamic-api/dynamic.controller';
import { DocumentaionController } from './documentation-api/documentation.controller';
import { FileUploadsController } from './fileuploads-api/fileuploads.controller';
import { SharesController } from './shares-api/shares.controller';
import { TriggerController } from './trigger-api/trigger.controller';
import { GalleryController } from './gallery-api/gallery.controller';

@Module({
    imports: [],
    controllers: [
        UploadsController,
        AuthorizationController,
        NewsController,
        PagesController,
        AddressesController,
        EmailerController,
        CreditController,
        DynamicController,
        FileUploadsController,
        DocumentaionController,
        SharesController,
        TriggerController,
        GalleryController,
        ContactsController
    ],
    providers: [
        MongoConnectionService,
        ExpressAppService,
    ],
})
export class AppModule {
}
