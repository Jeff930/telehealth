import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.page.html',
  styleUrls: ['./edit-entry.page.scss'],
})
export class EditEntryPage implements OnInit {

  showError=false;
  constructor(private router: Router,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public apiService: ApiService) { }

  ngOnInit() {
    this.userService.journalMode = "Edit";
  }

  saveChanges(){
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.updateEntry(this.userService.title,this.userService.content,this.userService.viewedEntry.EntryNo,this.userService.entryImages).subscribe(res => {
        if (res.affectedRows==1){
          this.userService.selectedIndex = 2;
          this.showError = false;
          this.loadingCtrl.dismiss();
          this.presentAlert();
        }else{
          this.presentError();
          this.showError = true;
          this.loadingCtrl.dismiss();
        }
      });
    });
  }

  cancelEdit(){
    this.router.navigateByUrl('/view-entry');
  }

  ionViewWillEnter(){
    this.userService.showMenubar = true;
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    this.userService.journalMode = "Edit";
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles',
      duration:1000
    }).then((res) => {
      res.present();
  });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert',
      header: 'Success!',
      message: 'Your entry has been updated.',
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
      message: 'Entry update failed.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
