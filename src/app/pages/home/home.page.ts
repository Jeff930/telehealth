import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform, ModalController  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { SocialPage } from '../social/social.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page;

  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public modalCtrl: ModalController,
    public apiService : ApiService) { }

  ngOnInit() {
    this.getEntries();
    this.userService.showMenubar = true;
    this.userService.selectedIndex = 0;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
  }

  ionViewWillEnter(){
    this.userService.showMenubar = true;
    this.userService.selectedIndex = 0;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
  }

  getEntries(){
    this.page = '1';
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.getEntries(this.page).subscribe( res=> {
        this.userService.entries = res.rows.slice(0,2);
        this.loadingCtrl.dismiss();
      },err =>{
        console.log(err);
      });
    });   
  }

  presentModal(){
    this.present();
  }
  async present() {
      const modal = await this.modalCtrl.create({
      component: SocialPage,
      cssClass: 'social'
    });
    return await modal.present();
  }
}
