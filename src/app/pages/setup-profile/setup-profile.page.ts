import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {

  isReadonly: boolean = true;
  formStatus: boolean = true;
  profileCopy;
  piTitle: string = "About Me";
  profile_form: FormGroup;
  imagePath;
  profileImage;
  btoaImage;
  view = true;
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
      userid: new FormControl(0),
      username: new FormControl(''),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      birthdate: new FormControl(new Date, Validators.required),
      email: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.getUserDetails();
      this.profile_form.valueChanges.subscribe(
      result => {
        if(this.profile_form.status == 'VALID'){
          this.formStatus = false;
        }else{
          this.formStatus = true;
        }
      });
    });
  }
  
  ionViewWillEnter(){
    this.profileImage = this.userService.profileImage;
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
    this.piTitle = "Edit";
    let date =  new Date(this.profile_form.value.birthdate);
    //date.setDate(date.getDate() + 2);
    console.log(date);
    let date2 = new Date(date).toISOString();
    this.profile_form.value.birthdate = date2;
    console.log(this.profile_form.value.birthdate);
    console.log(date);
    console.log(date2);
  }

  saveFormChanges() {
    console.log(this.profile_form.value);
    this.isReadonly = true;
    this.piTitle = "About Me";
    this.apiService.updateUserDetails(this.profile_form.value).subscribe( res => {
      this.getUserDetails();
    });
  }
  

  cancelChanges(){
    this.isReadonly = true;
    this.piTitle = "About Me";
    this.profile_form.patchValue({
      username: this.profileCopy[0].UserName,
      userid: this.profileCopy[0].UserId,
      firstname: this.profileCopy[0].FirstName,
      lastname: this.profileCopy[0].LastName,
      phone: this.profileCopy[0].Phone,
      birthdate: this.profileCopy[0].Birthdate,
      email: this.profileCopy[0].EmailAddress
    });
  }

  getUserDetails() {
    console.log(JSON.parse(localStorage.getItem('authenticated')));
    let userDetails = JSON.parse(localStorage.getItem('authenticated'));
    let userId = userDetails[0].UserId;
    this.apiService.getUserDetails(userId).subscribe(res => {
      this.loadingCtrl.dismiss();
      localStorage.setItem('authenticated' , JSON.stringify(res));
      this.userService.username = JSON.parse(localStorage.getItem('authenticated'))[0].UserName;
      this.userService.email = JSON.parse(localStorage.getItem('authenticated'))[0].EmailAddress;
      console.log(res);
      this.profileCopy = res;
      //let date = this.datepipe.transform(res[0].Birthdate, 'longDate');
      //console.log(date);
      this.profile_form.patchValue({
        username: res[0].UserName,
        userid: res[0].UserId,
        firstname: res[0].FirstName,
        lastname: res[0].LastName,
        phone: res[0].Phone,
        birthdate: res[0].Birthdate,
        email: res[0].EmailAddress
      });
    });
  }

  acceptImage(image){
    console.log(image);
      var file:File = image.files[0];
      const reader = new FileReader();
      console.log(image.files.length);
      console.log("entered")
      reader.onload = (event: any) => {
        var imagePath = event.target.result;
        var image = btoa(imagePath).replace("+", "-").replace("/", "_");
        console.log(this.userService.entryImages);
        this.profileImage = imagePath;
        this.btoaImage = image;
        console.log(this.profileImage);
        this.view = false;
      };
      reader.readAsDataURL(file);      
  }

  cancelProfile(){
    this.view = true;
    this.profileImage = this.userService.profileImage;
  }

  saveProfile(){
    this.apiService.updateProfileImage(this.btoaImage).subscribe(res =>{
      console.log(res);
      if (res == "success"){
        this.userService.profileImage = this.profileImage;
      this.view = true;
      }else{
        console.log(res);
      }
      
    })
  }
}
