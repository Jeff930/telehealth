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

  signupUser(formData) {
    const body = new HttpParams()
      .set('firstname', formData.firstname)
      .set('lastname', formData.lastname)
      .set('username', formData.username)
      .set('email', formData.email)
      .set('password', formData.password);
    console.log(body);
    return this.http.post<any>('http://localhost:5000/user-signup', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }
}
