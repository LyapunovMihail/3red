import { UploadItem } from 'angular2-http-file-upload';

export class NewsRedactFormUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/news/image';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
