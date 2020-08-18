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

  constructor() {   
  }
}
