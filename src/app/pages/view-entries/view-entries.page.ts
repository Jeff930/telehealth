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
  page;
  hasSearched=false;
  hasFiltered = false;
  searchInput="";
  searchDisplay="";
  dateInput="";
  dateDisplay="";
  pages;
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
    this.getEntries();
  }

  onChange(d){
    this.hasSearched = false;
    this.hasFiltered = false;
    this.apiService.getEntries(this.page).subscribe( res=> {
          console.log(res);
          this.userService.entries = res.rows;
        },err =>{
          console.log(err);
        });
  }

  getEntries(){
    this.page = 1;
    this.hasSearched = false;
    this.hasFiltered = false;
    this.apiService.getEntries(this.page).subscribe( res=> {
          console.log(res);
          this.userService.entries = res.rows;
          this.userService.totalPages = Array.from({length: res.totalPages}, (v, i) => i + 1);
        },err =>{
          console.log(err);
        });
  }

  nextPage(){
    this.page++;
    if(this.hasSearched == false && this.hasFiltered == false){
      this.apiService.getEntries(this.page).subscribe( res=> {
        console.log(res);
        this.userService.entries = res.rows;
      },err =>{
        console.log(err);
      });
    } else if(this.hasSearched == true && this.hasFiltered == false){
      this.upsertSearch();
    } else if(this.hasSearched == false && this.hasFiltered == true){
      this.upsertFilter();
    }
  }

  previousPage(){
    this.page--;
    if(this.hasSearched == false && this.hasFiltered == false){
      this.apiService.getEntries(this.page).subscribe( res=> {
        console.log(res);
        this.userService.entries = res.rows;
      },err =>{
        console.log(err);
      });
    } else if(this.hasSearched == true && this.hasFiltered == false){
      this.upsertSearch();
    } else if(this.hasSearched == false && this.hasFiltered == true){
      this.upsertFilter();
    }
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
    this.page = 1;
    console.log(event);
    console.log(this.searchInput);
    if (this.searchInput.length>3){
      this.upsertSearch();
    }
  }

  upsertSearch(){
    this.apiService.searchEntries(this.page,this.searchInput).subscribe( res=> {
      console.log(res);
      this.searchDisplay = this.searchInput;
      this.hasSearched = true;
      this.hasFiltered = false;
      this.userService.entries = res.rows;
    },err =>{
      console.log(err);
    });
  }

  filter(){
    this.page = 1;
    console.log(this.dateInput);
    this.dateInput = this.dateInput.split('T')[0]; 
    console.log(this.dateInput);
    this.upsertFilter();
  }

  upsertFilter(){
    this.apiService.filterEntries(this.page,this.dateInput).subscribe( res=> {
      this.dateDisplay = this.dateInput;
      this.hasSearched = false;
      this.hasFiltered = true;
      this.userService.entries = res.rows;
      console.log(res)
    },err =>{
      console.log(err);
    }); 
  }

  clearInput(){
    this.getEntries();
  }

}
