import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  password_form: FormGroup;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public apiService: ApiService
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
    this.apiService.verifyNumber(this.emailInput,num_input).subscribe(res =>{
      if (res == "Success"){
        this.step2 = false;
        this.step3 = true;
        this.wrong_num = false;
      }else{
        this.wrong_num = true;
      }
    })
  }

  submitEmail(emailInput) {
    console.log("called");
    this.apiService.sendVerification(emailInput).subscribe(res =>{
      if (res == "Success"){
        this.step1 = false;
        this.step2 = true;
      }
    })
  }

  changePassword(data) {
    // this.router.navigateByUrl('/login');
    // console.log(data);
    this.step3 = false;
    this.step4 = true;
  }

  goBackToLogin(){
    this.router.navigateByUrl('/login');
  }

}
