import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

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
    private router: Router,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer,
    public userService: UserService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    ) {
  }

  ngOnInit() {}

  acceptImage(image){
    console.log(image);
    for (var i=0;i<image.files.length;i++){ 
      var file:File = image.files[i];
      const reader = new FileReader();
      console.log(image.files.length);
      console.log("entered")
      reader.addEventListener('load', (event: any) => {
        console.log("entered")
        var tempImage = event.target.result;
        this.imagePaths.push(tempImage);
        var image = btoa(tempImage).replace("+", "-").replace("/", "_")
        this.images.push(image);
        this.userService.entryImages = this.images;
      });
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
