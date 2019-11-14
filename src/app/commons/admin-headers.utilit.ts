import { HttpHeaders } from '@angular/common/http';

export const adminHeaders = () => {
    return ({
        headers:  new HttpHeaders({
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token')
        })
    });
};
