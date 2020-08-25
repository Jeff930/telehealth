import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  showSidebar = false;
  showMenubar = true;
  title="";
  content="";
  journalMode="";
  entries = [];
  viewedEntry;
  entryImages = [];
  totalPages;
  firstPage;
  lastPage;
  selectedIndex = 0;
  email;
  username;
  profileImage = "https://journal4life.com/images/placeholder.jpg";

  constructor() {  
    //console.log(this.email) 
  }
}
