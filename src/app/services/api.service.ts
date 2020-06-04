import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  loginUser(formData) {
    var hashedPassword = Md5.hashStr(formData.password);
    var form = {
        email:formData.email,
        password:hashedPassword,
    }
    console.log(JSON.stringify(form));
    return this.http.get<any>('http://localhost:5000/user-login/'+JSON.stringify(form));
  }

  getUserDetails(emailAddress) {
    console.log(emailAddress);
    return this.http.get<any>('http://localhost:5000/user-details/'+emailAddress);
  }

  updateUserDetails(formData) {
    const body = new HttpParams()
      .set('firstname', formData.firstname)
      .set('lastname', formData.lastname)
      .set('userid', formData.userid)
      .set('username', formData.username)
      .set('email', formData.email);
    console.log(body);
    return this.http.post<any>('http://localhost:5000/update-user-details', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  signupUser(formData) {
    var hashedPassword = JSON.stringify(Md5.hashStr(formData.password));
    console.log(hashedPassword);
    const body = new HttpParams()
      .set('firstname', formData.firstname)
      .set('lastname', formData.lastname)
      .set('username', formData.username)
      .set('email', formData.email)
      .set('password', hashedPassword.substring(1,hashedPassword.length-1));
    console.log(body);
    return this.http.post<any>('http://localhost:5000/user-signup', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  createEntry(title,content) {
    const body = new HttpParams()
      .set('title', title)
      .set('content', content)
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    console.log(body);
    return this.http.post<any>('http://localhost:5000/create-entry', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  getEntries(page) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page);
    console.log(body);
    return this.http.post<any>('http://localhost:5000/get-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }
}
