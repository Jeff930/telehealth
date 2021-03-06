import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  verification_number: number;
  v_num_input: number;
  emailInput: "";
  num_verified: boolean = false;
  wrong_num: boolean = false;
  password;
  confirmPassword;
  password_form: FormGroup;
  passwordError = false;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public apiService: ApiService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.password_form = this.fb.group({
      new_password: new FormControl('', Validators.required),
      verify_password: new FormControl('', Validators.required)
    });
  }

  ionViewWillEnter(){
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }

  ngOnInit() {
  }

  submitRecovery(num_input) {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.verifyNumber(this.emailInput,num_input).subscribe(res =>{
        if (res == "Success"){
          this.step2 = false;
          this.step3 = true;
          this.wrong_num = false;
          this.loadingCtrl.dismiss();
        }else{
          this.wrong_num = true;
          this.presentWrong();
          this.loadingCtrl.dismiss();
        }
      });
    });
  }

  submitEmail(emailInput) {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.sendVerification(emailInput).subscribe(res =>{
        if (res == "Success"){
          this.loadingCtrl.dismiss();
          this.step1 = false;
          this.step2 = true;
        }else{
          this.loadingCtrl.dismiss();
          this.presentInvalid();
        }
      });
    });
  }

  async presentInvalid() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Invalid Email!',
      message: 'Please check your email.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentWrong() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Invalid Number!',
      message: 'Please check the verification number.',
      buttons: ['OK']
    });
    await alert.present();
  }


  changePassword() {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      if (this.password != null && this.password.length >= 6 && this.password == this.confirmPassword){
        this.apiService.updatePassword(this.password,this.emailInput).subscribe(res =>{
          if (res == "Success"){
            this.passwordError = false;
            this.loadingCtrl.dismiss();
            this.step3 = false;
            this.step4 = true;
          }
        })
      }else{
        this.passwordError = true;
        this.loadingCtrl.dismiss();
      }
    })
  }

  goBackToLogin(){
    this.router.navigateByUrl('/login');
  }
}
