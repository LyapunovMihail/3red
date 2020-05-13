import { UploadItem } from 'angular2-http-file-upload';

export class AboutTeamAdminUpload extends UploadItem {
   constructor(file: any) {
       super();
       this.url = '/api/admin/about/team/image/';
       this.headers = { token: sessionStorage.getItem('token') };
       this.file = file;
   }
}
