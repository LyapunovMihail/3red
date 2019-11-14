import { UploadItem } from 'angular2-http-file-upload';

export class DynamicAdminUpload extends UploadItem {
   constructor( id: any, urlPath: string, file: any ) {
        super();
        this.url = urlPath;
        this.headers = {
            id,
            token: sessionStorage.getItem('token')
        };
        if (id) {
            this.headers.id = id;
        }
        this.file = file;
   }
}
