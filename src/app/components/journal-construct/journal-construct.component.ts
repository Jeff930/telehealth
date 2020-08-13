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
    if (this.userService.journalMode == "Create"){
      this.imagePaths = [];
    }else{
      this.apiService.getTotalImage(this.userService.viewedEntry.EntryNo).subscribe(res => {
        console.log(res['totalFiles']);
        for (var i=0;i<res['totalFiles'];i++){
          this.imagePaths.push('https://journal4life.com/api/v1/images/entries/'+this.userService.viewedEntry.EntryNo+'/'+this.userService.viewedEntry.EntryNo+"-"+i+".jpeg");
        }
      });
    }
    console.log(this.imagePaths);
  }

  ionViewWillEnter(){}

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
