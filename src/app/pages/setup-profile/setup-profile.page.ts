import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {

  isReadonly: boolean = true;
  formStatus: boolean = true;
  profile_form: FormGroup;
  emailAddress: string;
  firstName: string;
  lastName: string;
  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public http: HttpClient,
    public userService: UserService,
    private apiService: ApiService) {
    this.profile_form = this.formBuilder.group({
      verseTitle: new FormControl('a', Validators.required),
      verseContent: new FormControl('a', Validators.required),
      userid: new FormControl(0),
      username: new FormControl('a'),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required])),
      date: new FormControl('a', Validators.required)
    });
  }

  ngOnInit() {
    this.getUserDetails();

    this.profile_form.valueChanges.subscribe(
      result => {
        if(this.profile_form.status == 'VALID'){
          this.formStatus = false;
        }else{
          this.formStatus = true;
        }
      });
  }
  
  ionViewWillEnter(){
    this.userService.showMenubar = true;
    console.log(this.platform.width());
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar,this.userService.showSidebar);
  }

  editForm() {
    this.isReadonly = false;
  }

  saveFormChanges() {
    this.isReadonly = true;
    // this.apiService.updateUserDetails(this.profile_form.value).subscribe( res => {
    //   console.log(res);
    //   this.getUserDetails();
    // });
  }

  getUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem('authenticated'));
    let emailAddress = userDetails.email;

    this.apiService.getUserDetails(emailAddress).subscribe(res => {
      // console.log(res);
      this.profile_form.patchValue({
        username: res[0].UserName,
        userid: res[0].UserId,
        firstname: res[0].FirstName,
        lastname: res[0].LastName,
        email: res[0].EmailAddress
      });

      this.emailAddress = res[0].EmailAddress;
      this.firstName = res[0].FirstName;
      this.lastName = res[0].LastName;
    });
  }
}
