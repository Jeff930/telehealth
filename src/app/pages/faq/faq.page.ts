import { Component, OnInit } from '@angular/core';
import { Platform  } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor( public platform : Platform) { }

  ngOnInit() {
  }

}
