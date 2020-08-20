import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  verification_number: number = 657392;
  v_num_input: number;
  e_num_input: "";
  num_verified: boolean = false;
  wrong_num: boolean = false;
  password_form: FormGroup;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {
    this.password_form = this.fb.group({
      new_password: new FormControl('', Validators.required),
      verify_password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  submitRecovery(num_input) {
    if (num_input == this.verification_number) {
      this.step2 = false;
    this.step3 = true;
    } else {
      this.wrong_num = true;
    }
  }

  submitEmail(num_input) {
    this.step1 = false;
    this.step2 = true;
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
