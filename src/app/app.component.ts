import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'My Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/setup-profile',
      icon: 'person'
    },
    {
      title: 'My Entries',
      url: '/view-entries',
      icon: 'reader'
    },
    {
      title: 'Create Entry',
      url: '/create-entry',
      icon: 'add-circle'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(){
    this.userService.showSidebar = false;
    this.userService.showMenubar = false;
    this.router.navigateByUrl('/login');
  }

  toggleSideBar(){
    if (this.userService.showSidebar)
      this.userService.showSidebar = false;
    else
    this.userService.showSidebar = true;

  }
}
