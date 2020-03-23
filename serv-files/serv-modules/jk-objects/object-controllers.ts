import { ObjectsPreviewController } from './preview-api/objects-preview.controller';
import { ObjectsProjectController } from './project-api/objects-project.controller';
import { ObjectsFlatController } from './flat-api/objects-flat.controller';
import { ObjectsTabsController } from './tabs-api/objects-tabs.controller';
import { ObjectsGalleryController } from './gallery-api/objects-gallery.controller';
import { ObjectsDocumentaionController } from './documentation-api/objects-documentation.controller';
import { ObjectsDecorationController } from './decoration-api/objects-decoration.controller';
import { ObjectsNewsController } from './news-api/objects-news.controller';
import { ObjectsLocationController } from './location-api/objects-location.controller';
import { ObjectsCreditController } from './credit-api/objects-credit.controller';

export const objectControllers = [
    ObjectsPreviewController,
    ObjectsProjectController,
    ObjectsFlatController,
    ObjectsTabsController,
    ObjectsGalleryController,
    ObjectsDocumentaionController,
    ObjectsDecorationController,
    ObjectsNewsController,
    ObjectsLocationController,
    ObjectsCreditController
];
