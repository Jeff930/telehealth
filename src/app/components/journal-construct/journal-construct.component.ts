import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-journal-construct',
  templateUrl: './journal-construct.component.html',
  styleUrls: ['./journal-construct.component.scss'],
})
export class JournalConstructComponent implements OnInit {

  entry_form: FormGroup;
  constructor(
    private router: Router,
    public userservice: UserService,
    public formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.entry_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      userid: new FormControl(1)
    });
  }

  ngOnInit() {
    this.userservice.ob.subscribe((result) => {
      this.saveFormDetails();
    }
    );
  }

  saveFormDetails(){
    this.router.navigateByUrl('/view-entries');
  }
}
