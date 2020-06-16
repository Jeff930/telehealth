import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {

  isReadonly: boolean = true;
  formStatus: boolean = true;
  piTitle: string = "Personal Information";
  profile_form: FormGroup;
  imagePaths = [];
  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public http: HttpClient,
    public userService: UserService,
    private apiService: ApiService,
    private datepipe: DatePipe) {
    this.profile_form = this.formBuilder.group({
      lifeverse: new FormControl('', Validators.required),
      versecontent: new FormControl('a', Validators.required),
      userid: new FormControl(0),
      username: new FormControl('a'),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      birthdate: new FormControl(new Date, Validators.required),
      email: new FormControl('', Validators.compose([Validators.required]))
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
    this.piTitle = "Edit Personal Information";
    let date =  new Date(this.profile_form.value.birthdate);
    date.setDate(date.getDate() + 2);
    let date2 = new Date(date).toISOString();
    this.profile_form.value.birthdate = date2;
    console.log(this.profile_form.value.birthdate);
    console.log(date);
    console.log(date2);
  }

  saveFormChanges() {
    this.isReadonly = true;
    this.piTitle = "Personal Information";
    this.apiService.updateUserDetails(this.profile_form.value).subscribe( res => {
      this.getUserDetails();
    });
  }

  getUserDetails() {
    let userDetails = JSON.parse(localStorage.getItem('authenticated'));
    let userId = userDetails[0].UserId;
    this.apiService.getUserDetails(userId).subscribe(res => {
      console.log(res);
      let date = this.datepipe.transform(res[0].Birthdate, 'longDate');
      console.log(date);
      this.profile_form.patchValue({
        username: res[0].UserName,
        userid: res[0].UserId,
        firstname: res[0].FirstName,
        lastname: res[0].LastName,
        lifeverse: res[0].LifeVerse,
        versecontent: res[0].VerseContent,
        birthdate: date,
        email: res[0].EmailAddress
      });
    });
  }

  acceptImage(image){
    console.log(image);
    for (var i=0;i<image.files.length;i++){ 
      var file:File = image.files[i];
      const reader = new FileReader();
      console.log(image.files.length);
      console.log("entered")
      reader.addEventListener('load', (event: any) => {
        console.log("entered")
        if(this.imagePaths.length <= 0){
          this.imagePaths.push(event.target.result);
        }else{
          this.imagePaths[0] = event.target.result;
        }
        this.userService.entryImages = this.imagePaths;
        console.log(file);
        console.log(this.imagePaths);
        console.log(this.imagePaths.length);
      
        });

        reader.readAsDataURL(file);
      
    }
   
  }
}
