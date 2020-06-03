import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  verification_number: number = 1234;
  v_num_input: number;
  num_verified: boolean = false;
  wrong_num: boolean = false;
  password_form: FormGroup;
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
      this.num_verified = true;
    } else {
      this.wrong_num = true;
    }
  }

  changePassword(data) {
    // this.router.navigateByUrl('/login');
    console.log(data);
  }

  goBackToLogin(){
    this.router.navigateByUrl('/login');
  }

}
