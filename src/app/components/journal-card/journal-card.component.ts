import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-journal-card',
  templateUrl: './journal-card.component.html',
  styleUrls: ['./journal-card.component.scss'],
})
export class JournalCardComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.getREntries();
  }

  goToEntry(){
    this.router.navigateByUrl('/view-entry');
  }

  getREntries(){
    const sample = this.userService.getRecentEntries();
    console.log(sample);
  }
}
