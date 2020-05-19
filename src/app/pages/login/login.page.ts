import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService) {
     this.login_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.required),
    });
    }

    ngOnInit(){}

    login(formData){
      this.userService.showSidebar = true;
      this.router.navigateByUrl('/home');
    }

    signup(){
      this.router.navigateByUrl('/signup');
    }

    ionViewWillEnter(){
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      console.log(this.userService.showMenubar,this.userService.showSidebar);
    }
}
