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
    return this.http.get<any>('https://localhost:5000/user-login/'+JSON.stringify(form));
  }

  getUserDetails(userId) {
    return this.http.get<any>('https://localhost:5000/user-details/'+userId);
  }

  getProfileImage(userId) {
    return this.http.get<any>('https://localhost:5000/profile-image/'+userId);
  }

  updateUserDetails(formData) {
    const body = new HttpParams()
      .set('firstname', formData.firstname)
      .set('lastname', formData.lastname)
      .set('birthdate', formData.birthdate)
      .set('userid', formData.userid)
      .set('username', formData.username)
      .set('email', formData.email)
      .set('phone',formData.phone)
      //.set('profile',image)
    console.log(body);
    return this.http.post<any>('https://localhost:5000/update-user-details', body.toString(),
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
      .set('birthdate',formData.birthdate)
      .set('password', hashedPassword.substring(1,hashedPassword.length-1));
    console.log(body);
    return this.http.post<any>('https://localhost:5000/user-signup', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  createEntry(title,content,images) {
    console.log(images);
    const body = new HttpParams()
      .set('title', title)
      .set('content', content)
      .set('images',JSON.stringify(images))
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    console.log(body);
    return this.http.post<any>('https://localhost:5000/create-entry', body.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  updateEntry(title,content,entryNo,images) {
    console.log(images);
    const body = new HttpParams()
      .set('title', title)
      .set('content', content)
      .set('entryNo', entryNo)
      .set('images',JSON.stringify(images))
      .set('userId', JSON.parse(localStorage.getItem('authenticated'))[0].UserId);
    console.log(body);
    return this.http.post<any>('https://localhost:5000/update-entry', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  getEntries(page) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page);
    console.log(body);
    return this.http.post<any>('https://localhost:5000/get-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  searchEntries(page,searchKey) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page)
      .set('searchKey',searchKey);
    console.log(body);
    return this.http.post<any>('https://localhost:5000/search-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  filterEntries(page,date) {
    const body = new HttpParams()
      .set('id', JSON.parse(localStorage.getItem('authenticated'))[0].UserId)
      .set('page', page)
      .set('date',date);
    console.log(body);
    return this.http.post<any>('https://localhost:5000/filter-entries', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  deleteEntry(id) {
    console.log(id);
    return this.http.get<any>('https://localhost:5000/delete-entry/'+id);
  }

  getTotalImage(id) {
    console.log(id);
    return this.http.get<any>('https://localhost:5000/get-entry-image-total/'+id);
  }
}
