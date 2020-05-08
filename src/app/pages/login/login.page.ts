import { Component, OnInit } from '@angular/core';
import {  NavController, LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient) {
      console.log("cordova " + this.platform.is('cordova'));
      console.log("android " + this.platform.is('android'));
      this.menuCtrl.enable(false,'main-content');
      // if (this.platform.is('android') && this.platform.is('cordova')) {
      //   console.log("Nav enabled");
      //   this.menuCtrl.enable(true, 'loginMenu');
      // } else {
      //   this.menuCtrl.enable(false, 'loginMenu');
      // }
      // this.menuCtrl.enable(false, 'myMenu');  

      this.login_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.required),
    });
    }

    ngOnInit(){}

    signup(){
      this.navCtrl.navigateForward('/signup');
    }

}
