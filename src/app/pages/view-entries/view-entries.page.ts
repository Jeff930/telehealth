import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController, MenuController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { JournalCardComponent } from '../../components/journal-card/journal-card.component';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.page.html',
  styleUrls: ['./view-entries.page.scss'],
})
export class ViewEntriesPage implements OnInit {

  @ViewChild(JournalCardComponent,null)card: JournalCardComponent;

  option = 0;
  page = 1;
  hasSearched = false;
  hasFiltered = false;
  searchInput = "";
  searchDisplay = "";
  dateInput = "";
  dateDisplay = "";
  pages;
  showSearchForMobile = false;
  constructor(public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public http: HttpClient,
    public userService: UserService,
    public apiService: ApiService) {
  }

  ngOnInit() {
    //this.getEntries();
    this.userService.firstPage = 1;
  }

  onChange(d) {
    if (this.page == 1) {
      this.userService.firstPage = 1;
    } else {
      this.userService.firstPage = 0;
    }

    if (this.page == this.pages) {
      this.userService.lastPage = 1;
    } else {
      this.userService.lastPage = 0;
    }

    this.hasSearched = false;
    this.hasFiltered = false;
    this.apiService.getEntries(this.page).subscribe(res => {
      this.userService.entries = res.rows;
    }, err => {
      console.log(err);
    });
  }

  getEntries() {
    this.page = 1;
    this.hasSearched = false;
    this.hasFiltered = false;
    this.apiService.getEntries(this.page).subscribe(res => {
      this.loadingCtrl.dismiss();
      this.loadingCtrl.dismiss();
      this.userService.entries = res.rows;
      this.pages = res.totalPages;
      this.userService.totalPages = Array.from({ length: res.totalPages }, (v, i) => i + 1);
      this.card.ionViewWillEnter();
      if (res.totalPages == 1) {
        this.userService.firstPage = 1;
        this.userService.lastPage = 1;
      }
      this.loadingCtrl.create({
        cssClass: 'yellow',
        spinner:'circles',
        duration:500
        }).then((res) => {
          res.present();
        })
    }, err => {
      console.log(err);
    });
  }

  nextPage() {
    this.page++;
    if (this.hasSearched == false && this.hasFiltered == false) {
      this.apiService.getEntries(this.page).subscribe(res => {
        this.userService.entries = res.rows;
      }, err => {
        console.log(err);
      });
    } else if (this.hasSearched == true && this.hasFiltered == false) {
      this.upsertSearch();
    } else if (this.hasSearched == false && this.hasFiltered == true) {
      this.upsertFilter();
    }
  }

  previousPage() {
    this.page--;
    if (this.hasSearched == false && this.hasFiltered == false) {
      this.apiService.getEntries(this.page).subscribe(res => {
        console.log(res);
        this.userService.entries = res.rows;
      }, err => {
        console.log(err);
      });
    } else if (this.hasSearched == true && this.hasFiltered == false) {
      this.upsertSearch();
    } else if (this.hasSearched == false && this.hasFiltered == true) {
      this.upsertFilter();
    }
  }

  showSearch() {
    if (this.option == 1)
      this.option = 0;
    else
      this.option = 1;
  }

  showSort() {
    if (this.option == 2)
      this.option = 0;
    else
      this.option = 2;
  }

  ionViewWillEnter() {
    this.userService.showMenubar = true;
    if (this.platform.width() > 850) {
      this.userService.showSidebar = true;
      this.showSearchForMobile = false;
    } else {
      this.userService.showSidebar = false;
      this.showSearchForMobile = true;
    }
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
      }).then((res) => {
        res.present();
        this.getEntries();
      });
  }

  search(event) {
    this.page = 1;
    if (this.searchInput.length > 2) {
      this.upsertSearch();
    }
  }

  upsertSearch() {
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles'
    }).then((res) => {
      res.present();
      this.apiService.searchEntries(this.page, this.searchInput).subscribe(res => {
        console.log(res);
        this.searchDisplay = this.searchInput;
        this.hasSearched = true;
        this.hasFiltered = false;
        this.loadingCtrl.dismiss();
        this.userService.entries = res.rows;
      }, err => {
        console.log(err);
        this.loadingCtrl.dismiss();
      });
    });
  }

  filter() {
    this.page = 1;
    this.dateInput = this.dateInput.split('T')[0];
    this.upsertFilter();
  }

  upsertFilter() {
    this.apiService.filterEntries(this.page, this.dateInput).subscribe(res => {
      this.dateDisplay = this.dateInput;
      this.hasSearched = false;
      this.hasFiltered = true;
      this.userService.entries = res.rows;
    }, err => {
      console.log(err);
    });
  }

  clearInput() {
    this.getEntries();
  }

}
