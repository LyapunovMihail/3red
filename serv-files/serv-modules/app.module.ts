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
import { DynamicController } from './dynamic-api/dynamic.controller';
import { FileUploadsController } from './fileuploads-api/fileuploads.controller';
import { SharesController } from './shares-api/shares.controller';
import { TriggerController } from './trigger-api/trigger.controller';
import { GalleryController } from './gallery-api/gallery.controller';
import { objectControllers } from './jk-objects/object-controllers';
import { homeControllers } from './home/home-controllers';

@Module({
    imports: [],
    controllers: [
        UploadsController,
        AuthorizationController,
        NewsController,
        PagesController,
        AddressesController,
        EmailerController,
        DynamicController,
        FileUploadsController,
        SharesController,
        TriggerController,
        GalleryController,
        ContactsController,

        ...objectControllers,
        ...homeControllers
    ],
    providers: [
        MongoConnectionService,
        ExpressAppService,
    ],
})
export class AppModule {
}
