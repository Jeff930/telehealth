import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.page.html',
  styleUrls: ['./create-entry.page.scss'],
})
export class CreateEntryPage implements OnInit {

  constructor(private router: Router,
    public loadingCtrl: LoadingController,
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

  saveEntry(){
    this.router.navigateByUrl('/view-entry');
  }

  cancelEntry(){
    this.router.navigateByUrl('/view-entries');
  }

}
