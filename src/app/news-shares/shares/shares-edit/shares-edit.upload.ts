import { UploadItem } from 'angular2-http-file-upload';

export class SharesImageUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/shares/image';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
