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
    if (this.userService.profileImage == "error"){
      this.profileImage = "https://journal4life.com/images/placeholder.jpg";
    }else{
      this.profileImage = this.userService.profileImage;
    }
    this.userService.showMenubar = true;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
  }

  editForm() {
    this.isReadonly = false;
    this.piTitle = "Edit";
    let date =  new Date(this.profile_form.value.birthdate);
    //date.setDate(date.getDate() + 2);
    let date2 = new Date(date).toISOString();
    this.profile_form.value.birthdate = date2;
  }

  saveFormChanges() {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.updateUserDetails(this.profile_form.value).subscribe( res => {
        if (res.affectedRows==1){
          this.isReadonly = true;
          this.piTitle = "About Me";
          this.loadingCtrl.dismiss();
          this.presentAlert();
          this.getUserDetails();
        }else{
          this.presentError();
        }
      });
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
    let userDetails = JSON.parse(localStorage.getItem('authenticated'));
    let userId = userDetails[0].UserId;
    this.apiService.getUserDetails(userId).subscribe(res => {
      this.loadingCtrl.dismiss();
      localStorage.setItem('authenticated' , JSON.stringify(res));
      this.userService.username = JSON.parse(localStorage.getItem('authenticated'))[0].UserName;
      this.userService.email = JSON.parse(localStorage.getItem('authenticated'))[0].EmailAddress;
      this.profileCopy = res;
      //let date = this.datepipe.transform(res[0].Birthdate, 'longDate');
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
      var file:File = image.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        var imagePath = event.target.result;
        var image = btoa(imagePath).replace("+", "-").replace("/", "_");
        this.profileImage = imagePath;
        this.btoaImage = image;
        this.view = false;
      };
      reader.readAsDataURL(file);      
  }

  cancelProfile(){
    this.view = true;
    this.profileImage = this.userService.profileImage;
  }

  saveProfile(){
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
    this.apiService.updateProfileImage(this.btoaImage).subscribe(res =>{
      if (res == "success"){
        this.loadingCtrl.dismiss();
        this.userService.profileImage = this.profileImage;
        this.view = true;
        this.presentImage();
      }else{
        this.loadingCtrl.dismiss();
        this.presentImageError();
      }
    });});
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your profile has been updated.',
      buttons: ['OK']
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
  }

  async presentError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Error!',
      message: 'Profile update failed.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentImage() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your profile image has been updated.',
      buttons: ['OK']
    });
    await alert.present();
    const { role, data } = await alert.onDidDismiss();
  }

  async presentImageError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Error!',
      message: 'Profile image update failed.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
