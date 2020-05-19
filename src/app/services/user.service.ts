import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  showSidebar = false;
  showMenubar = false;

  constructor() { }

}
