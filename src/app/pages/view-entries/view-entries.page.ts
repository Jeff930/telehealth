import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.page.html',
  styleUrls: ['./view-entries.page.scss'],
})
export class ViewEntriesPage implements OnInit {

  option = 0;

  constructor(public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService) {
      console.log("cordova " + this.platform.is('cordova'));
      console.log("android " + this.platform.is('android'));
      this.userService.showSidebar = true;
    }

  ngOnInit() {
  }

  showSearch(){
    if (this.option == 1)
      this.option = 0;
    else
      this.option = 1;
  }

  showSort(){
    if (this.option == 2)
      this.option = 0;
    else
      this.option = 2;
  }

}
