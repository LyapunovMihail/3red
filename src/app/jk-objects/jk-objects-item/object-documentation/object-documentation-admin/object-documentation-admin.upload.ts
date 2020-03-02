import { UploadItem } from 'angular2-http-file-upload';

export class ObjectDocumentationAdminUpload extends UploadItem {
   constructor( file: any ) {
        super();
        this.url = '/api/admin/jk-object/docs/file/set';
        this.headers = { token: sessionStorage.getItem('token') };
        this.file = file;
   }
}
