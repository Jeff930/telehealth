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
    return this.http.get<any>('https://journal4life.com:5000/user-login/'+JSON.stringify(form));
  }

  getUserDetails(userId) {
    return this.http.get<any>('https://journal4life.com:5000/user-details/'+userId);
  }

  getProfileImage(userId) {
    return this.http.get<any>('https://journal4life.com:5000/profile-image/'+userId);
  }

  updateUserDetails(formData) {
    var date = formData.birthdate.substr(0,10);
    const body = new HttpParams()
      .set('firstname', formData.firstname.replaceAll("'", "''"))
      .set('lastname', formData.lastname.replaceAll("'", "''"))
      .set('birthdate', date)
      .set('userid', formData.userid)
      .set('username', formData.username.replaceAll("'", "''"))
      .set('email', formData.email)
      .set('phone',formData.phone)
      //.set('profile',image)
    return this.http.post<any>('https://journal4life.com:5000/update-user-details', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  updatePassword(password,email) {
    var hashedPassword = JSON.stringify(Md5.hashStr(password));
    const body = new HttpParams()
      .set('email', email)
      .set('password', hashedPassword.substring(1,hashedPassword.length-1));
      //.set('profile',image)
    return this.http.post<any>('https://journal4life.com:5000/update-password', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  signupUser(formData) {
    var hashedPassword = JSON.stringify(Md5.hashStr(formData.password));
    const body = new HttpParams()
      .set('firstname', formData.firstname.replaceAll("'", "''"))
      .set('lastname', formData.lastname.replaceAll("'", "''"))
      .set('username', formData.username.replaceAll("'", "''"))
      .set('email', formData.email)
      .set('birthdate',formData.birthdate)
      .set('password', hashedPassword.substring(1,hashedPassword.length-1));
    return this.http.post<any>('https://journal4life.com:5000/user-signup', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  createEntry(title,content,images) {
    const body = new HttpParams()
      .set('title', title.replaceAll("'", "''"))
      .set('content', content.replaceAll("'", "''"))
      .set('images',JSON.stringify(images))
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    return this.http.post<any>('https://journal4life.com:5000/create-entry', body.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  updateEntry(title,content,entryNo,images) {
    const body = new HttpParams()
      .set('title', title.replaceAll("'", "''"))
      .set('content', content.replaceAll("'", "''"))
      .set('entryNo', entryNo)
      .set('images',JSON.stringify(images))
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    return this.http.post<any>('https://journal4life.com:5000/update-entry', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  updateProfileImage(image) {
    const body = new HttpParams()
      .set('image',JSON.stringify(image))
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    return this.http.post<any>('https://journal4life.com:5000/upload-profile', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  getEntries(page) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page);
    return this.http.post<any>('https://journal4life.com:5000/get-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  verifyNumber(email,num) {
    const body = new HttpParams()
      .set('email', email)
      .set('number', num);
    return this.http.post<any>('https://journal4life.com:5000/verify', body.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  sendVerification(email) {
    const body = new HttpParams()
      .set('email', email);
    return this.http.post<any>('https://journal4life.com:5000/send-email', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  searchEntries(page,searchKey) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page)
      .set('searchKey',searchKey.replaceAll("'", "''"));
    return this.http.post<any>('https://journal4life.com:5000/search-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  filterEntries(page,date) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page)
      .set('date',date);
    return this.http.post<any>('https://journal4life.com:5000/filter-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  deleteEntry(id) {
    return this.http.get<any>('https://journal4life.com:5000/delete-entry/'+id);
  }

  getTotalImage(id) {
    return this.http.get<any>('https://journal4life.com:5000/get-entry-image-total/'+id);
  }
}
