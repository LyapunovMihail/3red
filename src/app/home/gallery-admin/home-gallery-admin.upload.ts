import { UploadItem } from 'angular2-http-file-upload';

export class HomeGalleryAdminUpload extends UploadItem {
    constructor( urlPath: string, file: any, type?, id? ) {
        super();
        this.url = urlPath;
        this.headers = { token: sessionStorage.getItem('token') };
        if (id) {
            this.headers.id = id;
        }
        if (type) {
            this.headers.type = type;
        }
        this.file = file;
    }
}
