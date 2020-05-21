import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
})
export class SetupProfilePage implements OnInit {

  formStatus: boolean =  true;
  profile_form: FormGroup;
  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService) {
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
  }
s
  ionViewWillEnter(){
    this.userService.showMenubar = true;
    if (this.platform.is('desktop')) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar,this.userService.showSidebar);
  }

  editForm(){
    this.formStatus = false;
    console.log(this.formStatus );
  }

  saveFormChanges(){
    this.formStatus = true;
    console.log(this.formStatus );
  }
}
