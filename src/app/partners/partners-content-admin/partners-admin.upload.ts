import { UploadItem } from 'angular2-http-file-upload';

export class PartnersAdminUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/partners/image/';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
