import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.page.html',
  styleUrls: ['./create-entry.page.scss'],
})
export class CreateEntryPage implements OnInit {

  showError=false;

  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public apiService : ApiService) {
    }

  ngOnInit() {
    this.userService.title = "";
    this.userService.content = "";
    this.userService.journalMode = "Create";
  }

  saveEntry(){
    console.log(this.userService.title);
    console.log(this.userService.content);
    console.log(this.userService.entryImages);
    this.apiService.createEntry(this.userService.title,this.userService.content,this.userService.entryImages).subscribe(res => {
      console.log(res['Success']);
      if (res['Success']==true){
        this.showError = false;
        this.userService.selectedIndex = 2;
        this.userService.title = "";
        this.userService.content = "";
        this.userService.entryImages = [];
        // this.router.navigateByUrl('/view-entries');
        this.presentAlert();
      }else{
        this.showError = true;
        this.presentError();
      }
    });
  }

  cancelEntry(){
    this.router.navigateByUrl('/view-entries');
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
    this.userService.title = "";
    this.userService.content = "";
    this.userService.journalMode = "Create";
    console.log(this.userService.journalMode);
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles',
      duration:1000
    }).then((res) => {
      res.present();
  });}

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your entry has been created.',
      buttons: ['OK']
    });
    await alert.present();

    const { role, data } = await alert.onDidDismiss();
    this.router.navigateByUrl('/view-entries');
  }

  async presentError() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Error!',
      message: 'Entry creation failed.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
