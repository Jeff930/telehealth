import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signup_form: FormGroup;
  showError=false;
  showShortPassword=false;
  showPasswordMismatch=false;
  showSuccess=false;

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    private apiService: ApiService) {
     this.signup_form = this.formBuilder.group({
        firstname: new FormControl('', Validators.compose([Validators.required])),
        lastname: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl('', Validators.compose([Validators.required])),
        username: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl('', Validators.required),
        birthdate: new FormControl(new Date, Validators.required),
        confirmpassword: new FormControl('', Validators.required),
      });
    }

    ngOnInit(){}

    signup(formData){
      if ( formData.password === formData.confirmpassword) {
        if (formData.password.length < 6) {
          this.showShortPassword = true;
          this.showError = false;
          this.showSuccess = false;
          this.showPasswordMismatch = false;
        } else {
          this.apiService.signupUser(formData).subscribe( res => {
            console.log(res);
            if (res.affectedRows==1){
              this.showSuccess = true;
              this.showShortPassword = false;
              this.showError = false;
              this.showPasswordMismatch = false;
            }else{
              this.showSuccess = false;
              this.showShortPassword = false;
              this.showError = true;
              this.showPasswordMismatch = false;
            }
          });
        }
      } else {
          this.showError = false;
          this.showShortPassword = false;
          this.showSuccess = false;
          this.showPasswordMismatch = true; 
      }
    }

    login(){
      this.router.navigate(['/login']);
    }

    ionViewWillEnter(){
      this.userService.showMenubar = false;
      this.userService.showSidebar = false;
      console.log(this.userService.showMenubar,this.userService.showSidebar);
    }

}
