import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgxImageCompressService} from 'ngx-image-compress';
import Quill from "quill";
import { cpuUsage } from 'process';

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
    public imageCompress: NgxImageCompressService
    ) {
  }

  ngOnInit() {
    console.log(this.userService.journalMode);
    if (this.userService.journalMode == "Create"){
      this.imagePaths = [];
      this.images = [];
      this.userService.imagePaths = [];
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
      this.userService.imagePaths = [];
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
            this.userService.entryImages.push(btoa(this.imagePaths[i]).replace("+", "-").replace("/", "_"));
            console.log(this.images);
          }
        });
      })
    }
  }

  acceptImage(image){
    console.log("called");
    this.loadingCtrl.create({
      cssClass: 'yellow',
      spinner:'circles',
    }).then((res) => {
      res.present();
      console.log(this.userService.entryImages);
      for (var i=0;i<image.files.length;i++){ 
        var file:File = image.files[i];
        const reader = new FileReader();
        reader.onload = (event: any) => {
          var tempImage = event.target.result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(tempImage));
          if (this.imageCompress.byteCount(tempImage) < 250000){
            console.log("called");
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(tempImage));
            this.userService.imagePaths.push(tempImage);
            this.imagePaths = this.userService.imagePaths;
            var image = btoa(tempImage).replace("+", "-").replace("/", "_");
            this.images.push(image);
            this.userService.entryImages.push(image);
            this.loadingCtrl.dismiss();
            console.log(this.userService.entryImages);
          }else{
            if (this.imageCompress.byteCount(tempImage) > 900000){
              console.log("called2");
              this.imageCompress.compressFile(tempImage, "", 40, 40).then(
              result => {
                var compressedImage = result;
                console.warn('Size in bytes is now:', this.imageCompress.byteCount(compressedImage));
                this.userService.imagePaths.push(compressedImage);
                this.imagePaths = this.userService.imagePaths;
                var image = btoa(compressedImage).replace("+", "-").replace("/", "_");
                this.images.push(image);
                this.userService.entryImages.push(image);
                this.loadingCtrl.dismiss();
                console.log(this.userService.entryImages);
              });
            }else{
              console.log("called3");
              this.imageCompress.compressFile(tempImage, "", 60, 60).then(
                result => {
                  var compressedImage = result;
                  console.warn('Size in bytes is now:', this.imageCompress.byteCount(compressedImage));
                  this.userService.imagePaths.push(compressedImage);
                  this.imagePaths = this.userService.imagePaths;
                  var image = btoa(compressedImage).replace("+", "-").replace("/", "_");
                  this.images.push(image);
                  this.userService.entryImages.push(image);
                  this.loadingCtrl.dismiss();
                  console.log(this.userService.entryImages);
                });
            }
          }
        }
        reader.readAsDataURL(file);     
      } 
    });
  }

  removeImage(index){
    this.imagePaths.splice(index,1);
    this.images.splice(index,1);
    this.userService.entryImages = this.images;
  }
}
