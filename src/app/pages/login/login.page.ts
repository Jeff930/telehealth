import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;
  showError= false;

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    private authService: AuthenticationService,
    private apiService: ApiService) {
     this.login_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.required),
    });
    }

    ngOnInit(){
      this.clearAuthenticatedUser();
    }

    // login(formData){
    //   // localStorage.setItem('authenticated' , JSON.stringify(formData)); 
    //   // this.router.navigateByUrl('/home');
    //   this.userService.showSidebar = true;
    //   this.authService.login(formData);
    // }

    login(formData) {  
        this.apiService.loginUser(formData.email,formData.password).subscribe(res => {
          console.log(res);
          console.log(res[0]);
          
        });
      }

    signup(){
      this.router.navigateByUrl('/signup');
    }

    ionViewWillEnter(){
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      console.log(this.userService.showMenubar,this.userService.showSidebar);
    }

    clearAuthenticatedUser(){
      this.authService.logout();
      this.login_form.reset();
    }

    recover(){
      this.router.navigateByUrl('/forgot-password');
    }
}
