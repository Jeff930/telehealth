import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
    public http : HttpClient,
    public userService : UserService) {
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

    ionViewWillEnter(){
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      console.log(this.userService.showMenubar,this.userService.showSidebar);
    }

}
