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
      verseTitle: new FormControl('', Validators.required),
      verseContent: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required])),
      date: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getUserDetails();
  }
  
  ionViewWillEnter() {
    this.userService.showMenubar = true;
    if (this.platform.is('desktop')) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar, this.userService.showSidebar);
  }

  editForm() {
    this.formStatus = false;
    console.log(this.formStatus);
  }

  saveFormChanges() {
    this.formStatus = true;
    console.log(this.formStatus);
  }

  getUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem('authenticated'));
    let emailAddress = userDetails.email;

    this.apiService.getUserDetails(emailAddress).subscribe(res => {
      console.log(res);
      this.profile_form.patchValue({
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
