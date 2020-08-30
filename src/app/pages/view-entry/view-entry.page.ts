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
    this.apiService.deleteEntry(this.userService.viewedEntry.EntryNo).subscribe(res => {
      alert("Entry deleted successfully!")
      this.userService.selectedIndex = 2;
      this.router.navigateByUrl('/view-entries');
    });
  }

  ionViewWillEnter(){
    this.imagePaths =[];
    this.userService.showMenubar = true;
    console.log(this.platform.width());
    if (this.platform.width()>850) {
      this.userService.showSidebar = true;
    } else {
      this.userService.showSidebar = false;
    }
    console.log(this.userService.showMenubar,this.userService.showSidebar);
    console.log(this.userService.viewedEntry.EntryNo)
    this.apiService.getTotalImage(this.userService.viewedEntry.EntryNo).subscribe(res => {
      console.log(res);
      this.imagePaths = res;
      // for (var i=0;i<res['totalFiles'];i++){
      //   this.imagePaths.push('https://journal4life.com/api/v1/images/entries/'+this.userService.viewedEntry.EntryNo+'/'+this.userService.viewedEntry.EntryNo+"-"+i+".jpeg");
      // }
    });
  }

  getViewedEntry(){
    this.viewedEntry = this.userService.viewedEntry;
    console.log(this.viewedEntry)
  }
}
