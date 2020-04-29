import { UploadItem } from 'angular2-http-file-upload';

export class ObjectPreviewAdminUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/jk-object/credit/image/';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
