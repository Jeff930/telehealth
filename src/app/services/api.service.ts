import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  loginUser(formData) {
    var form = {
        email:formData.email,
        password:formData.password,
    }
    console.log(JSON.stringify(form));
    return this.http.get<any>('http://localhost:5000/user-login/'+JSON.stringify(form));
  }
}
