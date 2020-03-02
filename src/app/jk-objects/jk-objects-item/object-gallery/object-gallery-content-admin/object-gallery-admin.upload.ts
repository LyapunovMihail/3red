import { UploadItem } from 'angular2-http-file-upload';

export class ObjectGalleryAdminUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/jk-object/gallery/image/';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
