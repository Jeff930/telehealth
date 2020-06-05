import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mySubject = new Subject<any>();
  ob = this.mySubject.asObservable();
  
  showSidebar = false;
  showMenubar = true;
  title="";
  content="";
  rEntries = [];
  constructor() { 
    
  }

  saveEntry(){
    this.mySubject.next();
  }

  setRecentEntries(entries){
    this.rEntries = entries;
  }

  getRecentEntries(){
    return this.rEntries;
  }
}
