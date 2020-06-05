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
  entries = [];

  constructor() {   
  }
  
}
