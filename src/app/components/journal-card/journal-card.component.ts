import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-card',
  templateUrl: './journal-card.component.html',
  styleUrls: ['./journal-card.component.scss'],
})
export class JournalCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToEntry(){
    this.router.navigateByUrl('/view-entry');
  }

}
