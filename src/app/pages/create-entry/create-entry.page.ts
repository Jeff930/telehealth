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
    }

  ngOnInit() {
  }

  saveEntry(){
    this.router.navigateByUrl('/view-entry');
  }

  cancelEntry(){
    this.router.navigateByUrl('/view-entries');
  }

  ionViewWillEnter(){
    this.userService.showMenubar = true;
    if (this.platform.is('desktop')) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar,this.userService.showSidebar);
  }

}
