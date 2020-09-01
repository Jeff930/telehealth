import { Component, OnInit } from '@angular/core';

import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  // public selectedIndex = 0;
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
    // },
    // {
    //   title: 'Logout',
    //   url: '/login',
    //   icon: 'log-out'
    }
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    public alertCtrl: AlertController,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authState.subscribe(state => {
        console.log(state);
        if (state) {
          this.apiService.getProfileImage(JSON.parse(localStorage.getItem('authenticated'))[0].UserId).subscribe(res => {
            console.log(res);
            if (res=="error"){
              console.log("here");
              this.userService.profileImage = "https://journal4life.com/images/placeholder.jpg";
            }else{
              console.log(res);
              this.userService.profileImage = res;
            }
            this.router.navigateByUrl('/home');
          })
        } else {
          this.router.navigateByUrl('/login');
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.userService.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  getUsername(){
    return JSON.parse(localStorage.getItem('authenticated'))[0].UserName;
  }

  getEmail(){
    return JSON.parse(localStorage.getItem('authenticated'))[0].EmailAddress;
  }

  logout(){
    this.presentAlertConfirm();
  }

  toggleSideBar(){
    if (this.userService.showSidebar)
      this.userService.showSidebar = false;
    else
    this.userService.showSidebar = true;
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Do you really want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.authenticationService.logout();
          }
        }
      ]
    });
    await alert.present();
  }
}
