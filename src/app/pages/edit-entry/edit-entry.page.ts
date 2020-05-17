import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.page.html',
  styleUrls: ['./edit-entry.page.scss'],
})
export class EditEntryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  saveChanges(){
    this.router.navigateByUrl('/view-entry');
  }

  cancelEdit(){
    this.router.navigateByUrl('/view-entry')
  }

}
