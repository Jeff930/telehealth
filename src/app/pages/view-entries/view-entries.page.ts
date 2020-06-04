import { Component, OnInit } from '@angular/core';
import { LoadingController , AlertController, MenuController , Platform  } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.page.html',
  styleUrls: ['./view-entries.page.scss'],
})
export class ViewEntriesPage implements OnInit {

  option = 0;
  searchInput="";

  constructor(public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient,
    public userService : UserService,
    public apiService : ApiService) {
    }

  ngOnInit() {
    this.apiService.getEntries(1).subscribe( res=> {
          console.log(res)
        },err =>{
          console.log(err);
        });
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

  ionViewWillEnter(){
    this.userService.showMenubar = true;
    console.log(this.platform.width());
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar,this.userService.showSidebar);
  }

  search(event){
    console.log(this.searchInput);
    if (this.searchInput.length>3){
      
    }
  }

}
