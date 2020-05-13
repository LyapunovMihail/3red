import { UploadItem } from 'angular2-http-file-upload';

export class AboutDocumentationAdminUpload extends UploadItem {
   constructor( file: any ) {
        super();
        this.url = '/api/admin/about/docs/file/set';
        this.headers = { token: sessionStorage.getItem('token') };
        this.file = file;
   }
}
