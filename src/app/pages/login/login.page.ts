import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
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
  email;
  password;

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
      this.loadingCtrl.create({
        cssClass: 'yellow',
        spinner:'circles',
        duration:700
      }).then((res) => {
        res.present();
        this.clearAuthenticatedUser();
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      if (localStorage.getItem('suggestion')){
        this.login_form.value.email = JSON.parse(localStorage.getItem('suggestion')).email;
        this.login_form.value.password = JSON.parse(localStorage.getItem('suggestion')).password;
        this.login_form.patchValue({
          email: JSON.parse(localStorage.getItem('suggestion')).email,
          password: JSON.parse(localStorage.getItem('suggestion')).password
        });
      }
      });   
    }

    login(formData) {
      this.loadingCtrl.create({
        cssClass: 'yellow',
        spinner:'circles'
      }).then((res) => {
        res.present();
        localStorage.setItem('suggestion' , JSON.stringify(formData));
        this.apiService.loginUser(formData).subscribe(res => {
          if (res[0]!=undefined){
            if (res[0].UserId!=undefined){
              this.showError=false;
              this.authService.login(res);
              this.login_form.reset()
              this.loadingCtrl.dismiss();
            }else{
              this.loadingCtrl.dismiss();
              this.presentError();
              this.showError=true;
            }
          }else{
            if (res[0]= []){
              this.loadingCtrl.dismiss();
              this.presentInvalid();
              this.showError=true;
            }else{
              this.loadingCtrl.dismiss();
              this.presentError();
              this.showError=true;
            }
          }
        });
      });
    }

    signup(){
      this.router.navigateByUrl('/signup');
    }

    faq(){
      this.router.navigateByUrl('/faq');
    }

    ionViewWillEnter(){
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      if (localStorage.getItem('suggestion')){
        this.login_form.value.email = JSON.parse(localStorage.getItem('suggestion')).email;
        this.login_form.value.password = JSON.parse(localStorage.getItem('suggestion')).password;
        this.login_form.patchValue({
          email: JSON.parse(localStorage.getItem('suggestion')).email,
          password: JSON.parse(localStorage.getItem('suggestion')).password
        });
      }
    }

    clearAuthenticatedUser(){
      this.authService.logout();
      this.login_form.reset();
    }

    recover(){
      this.router.navigateByUrl('/forgot-password');
    }

    async presentInvalid() {
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: 'Invalid Login!',
        message: 'No matching account found.',
        buttons: ['OK']
      });
      await alert.present();
      const { role, data } = await alert.onDidDismiss();
    }
  
    async presentError() {
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: 'Error!',
        message: 'Failed to login.',
        buttons: ['OK']
      });
      await alert.present();
    }
}
