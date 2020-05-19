import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private platform: Platform,
    public toastController: ToastController
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