import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.page.html',
  styleUrls: ['./view-entry.page.scss'],
})
export class ViewEntryPage implements OnInit {

  viewedEntry;
  imagePaths=[];
  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public apiService: ApiService) {
    }

  ngOnInit() {
    this.getViewedEntry();
  }

  editEntry(){
    this.userService.title = this.viewedEntry.Title;
    this.userService.content = this.viewedEntry.Content;
    this.router.navigateByUrl('/edit-entry');
  }
  
  deleteEntry(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Do you really want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelled');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.apiService.deleteEntry(this.userService.viewedEntry.EntryNo).subscribe(res => {
              this.userService.selectedIndex = 2;
              this.presentDelete();
              //this.router.navigateByUrl('/view-entries');
            },err=>{
              this.presentError();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentDelete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your entry has been deleted.',
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
      message: 'Entry deletion failed.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ionViewWillEnter(){
    this.imagePaths =[];
    this.userService.showMenubar = true;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles',
      duration:1500
    }).then((res) => {
      res.present();
      this.getViewedEntry();
      this.apiService.getTotalImage(this.userService.viewedEntry.EntryNo).subscribe(res => {
        this.imagePaths = res;
        this.loadingCtrl.dismiss();
      });
  });
  }

  getViewedEntry(){
    this.viewedEntry = this.userService.viewedEntry;
  }
}
