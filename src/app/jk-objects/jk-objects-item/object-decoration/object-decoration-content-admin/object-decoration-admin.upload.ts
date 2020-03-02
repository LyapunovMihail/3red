import { UploadItem } from 'angular2-http-file-upload';

export class ObjectDecorationAdminUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/jk-object/decoration/image/';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
