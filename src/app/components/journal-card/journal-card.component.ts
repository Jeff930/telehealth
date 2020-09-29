import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-journal-card',
  templateUrl: './journal-card.component.html',
  styleUrls: ['./journal-card.component.scss'],
})
export class JournalCardComponent implements OnInit {

  image = [];

  constructor(
    private router: Router,
    public userService: UserService
    ) {}

  ngOnInit() {  }

  ionViewWillEnter(){  }

  date(){
    return Date.now();
  }

  goToEntry(entry){
    this.userService.viewedEntry = entry;
    this.router.navigateByUrl('/view-entry');
  }

  trimDate(date){
    var formatted = date.split('T')[0]; 
    return formatted;
  }

  getContent(content){
    content = content.replace(/<[^>]*>/g, '');
    if (content.length>=30)
      return content.substring(0,30)+"...";
    else 
      return content;
  }
  
}
