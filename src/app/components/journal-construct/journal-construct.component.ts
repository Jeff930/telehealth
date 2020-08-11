import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-journal-construct',
  templateUrl: './journal-construct.component.html',
  styleUrls: ['./journal-construct.component.scss'],
})
export class JournalConstructComponent implements OnInit {

  entry_form: FormGroup;
  imagePaths = [];
  images = [];

  constructor(
    public userService: UserService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    ) {
  }

  ngOnInit() {
    this.imagePaths = [];
    console.log(this.imagePaths);
  }

  ionViewWillEnter(){
    this.imagePaths = [];
    console.log(this.imagePaths);
  }

  acceptImage(image){
    console.log(image);
    for (var i=0;i<image.files.length;i++){ 
      var file:File = image.files[i];
      const reader = new FileReader();
      console.log(image.files.length);
      console.log("entered")
      reader.onload = (event: any) => {
        console.log("entered")
        var tempImage = event.target.result;
        this.imagePaths.push(tempImage);
        var image = btoa(tempImage).replace("+", "-").replace("/", "_")
        this.images.push(image);
        this.userService.entryImages = this.images;
      };
      reader.readAsDataURL(file);      
    }
  }

  removeImage(index){
    this.imagePaths.splice(index,1);
    this.images.splice(index,1);
    this.userService.entryImages = this.images;
    console.log(this.imagePaths);
  }
}
