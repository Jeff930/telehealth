import { Component, OnInit } from '@angular/core';
import { Platform  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  showHeader = true;
  constructor( public platform : Platform,
    private router: Router) { }

  ngOnInit() {
  }

  back(){
    if (localStorage.getItem("authenticated")){
      this.router.navigateByUrl('/home');
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  ionViewWillEnter(){
    if (localStorage.getItem("authenticated")){
      this.showHeader = false;
    }else{
      this.showHeader = true;
    }
  }

  test(){
    this.router.navigateByUrl('/chat');
  }
}
