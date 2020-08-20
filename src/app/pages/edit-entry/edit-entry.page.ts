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
    console.log(this.userService.entryImages);
    this.apiService.updateEntry(this.userService.title,this.userService.content,this.userService.viewedEntry.EntryNo,this.userService.entryImages).subscribe(res => {
      console.log(res);
      if (res.affectedRows==1){
        this.showError = false;
        this.router.navigateByUrl('/view-entries');
      }else{
        this.showError = true;
      }
    });
  }

  cancelEdit(){
    this.router.navigateByUrl('/view-entry')
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
    this.userService.journalMode = "Edit";
    console.log(this.userService.journalMode);
  }

}
