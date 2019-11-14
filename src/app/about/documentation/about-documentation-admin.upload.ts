import { UploadItem } from 'angular2-http-file-upload';

export class DocumentationAdminUpload extends UploadItem {
   constructor( file: any, id: any ) {
        super();
        this.url = '/api/admin/documentation/file/set';
        this.headers = { token: sessionStorage.getItem('token') };
        this.headers.id = id;
        this.file = file;
   }
}
