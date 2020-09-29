import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Quill from "quill";

@Component({
  selector: 'app-journal-construct',
  templateUrl: './journal-construct.component.html',
  styleUrls: ['./journal-construct.component.scss'],
})
export class JournalConstructComponent implements OnInit {

  entry_form: FormGroup;
  imagePaths = [];
  images = [];

  public editorOptions = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
     
        ['clean'],                                         // remove formatting button

        ['link']                         // link and image, video
    ]
  };

  constructor(
    public userService: UserService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    ) {
  }

  ngOnInit() {
    console.log(this.userService.journalMode);
    if (this.userService.journalMode == "Create"){
      this.imagePaths = [];
      this.images = [];
    }else{
      this.apiService.getTotalImage(this.userService.viewedEntry.EntryNo).subscribe(res => {
        this.imagePaths = res;
        this.userService.imagePaths = res;
        for (var i=0;i<this.imagePaths.length;i++){
          this.images.push(btoa(this.imagePaths[i]).replace("+", "-").replace("/", "_"));
          this.userService.entryImages = this.images;
        }
      });
    }}

  ionViewWillEnter(){
    console.log(this.userService.journalMode);
    if (this.userService.journalMode == "Create"){
      this.imagePaths = [];
      this.images = [];
    }else{
      this.loadingCtrl.create({
        cssClass: 'yellow',
        spinner:'circles',
        duration:1500
      }).then((res) => {
        this.apiService.getTotalImage(this.userService.viewedEntry.EntryNo).subscribe(res => {
          this.imagePaths = res;
          this.userService.imagePaths = res;
          for (var i=0;i<this.imagePaths.length;i++){
            this.images.push(btoa(this.imagePaths[i]).replace("+", "-").replace("/", "_"));
            this.userService.entryImages = this.images;
          }
        });
      })
    }
  }

  acceptImage(image){
    for (var i=0;i<image.files.length;i++){ 
      var file:File = image.files[i];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        var tempImage = event.target.result;
        this.imagePaths.push(tempImage);
        this.userService.imagePaths = this.imagePaths;
        var image = btoa(tempImage).replace("+", "-").replace("/", "_");
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
  }
}
