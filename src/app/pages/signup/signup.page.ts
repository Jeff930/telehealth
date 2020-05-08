import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signup_form: FormGroup;

  constructor(
    private router: Router,
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

      this.signup_form = this.formBuilder.group({
        firstname: new FormControl('', Validators.compose([Validators.required])),
        lastname: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      });
    }

    ngOnInit(){}

    login(){
      this.router.navigate(['/login']);
    }

}
