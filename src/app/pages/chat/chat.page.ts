import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from "ngx-facebook";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private facebookService: FacebookService) { }

  ngOnInit() {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }

}
