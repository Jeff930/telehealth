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
    private userService: UserService
    ) {
      for (var i = 0; i< this.userService.entries.length;i++){
        this.image.push('https://journal4life.com/api/v1/images/entries/'+ this.userService.entries[i].EntryNo + '/' + this.userService.entries[i].EntryNo + '-0.jpeg');
        console.log(this.image)
      }
     }

  ngOnInit() {
    for (var i = 0; i< this.userService.entries.length;i++){
      this.image.push('https://journal4life.com/api/v1/images/entries/'+ this.userService.entries[i].EntryNo + '/' + this.userService.entries[i].EntryNo + '-0.jpeg');
      console.log(this.image)
    }
  }

  ionViewWillEnter(){
    for (var i = 0; i< this.userService.entries.length;i++){
      this.image.push('https://journal4life.com/api/v1/images/entries/'+ this.userService.entries[i].EntryNo + '/' + this.userService.entries[i].EntryNo + '-0.jpeg');
      console.log(this.image)
    }
    
  }

  date(){
    return Date.now();
  }

  // getImage(entry){
  //   return 'https://journal4life.com/api/v1/images/entries/'+ entry + '/' + entry + '-0.jpeg'
  // }

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
