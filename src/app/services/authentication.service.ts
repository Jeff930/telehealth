import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController,
    public userService: UserService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    if (localStorage.getItem('authenticated')){
      this.authState.next(true);
    }
  }

  login(user_creds) {
    localStorage.setItem('authenticated' , JSON.stringify(user_creds));
    this.userService.email = JSON.parse(localStorage.getItem('authenticated'))[0].EmailAddress;
    this.userService.username = JSON.parse(localStorage.getItem('authenticated'))[0].UserName;
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('authenticated');
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }



}