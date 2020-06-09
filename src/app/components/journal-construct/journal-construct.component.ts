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
  imagePath;

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
    const file: File = image.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.addEventListener('load', (event: any) => {
      this.imagePath = event.target.result;
      console.log(this.imagePath);
    //   this.apiService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {
        
    //     },
    //     (err) => {
        
    //     })
     });

    var test= reader.readAsDataURL(file);
    console.log(test);
  }
}
