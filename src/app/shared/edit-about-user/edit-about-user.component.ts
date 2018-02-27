import { AppComponent } from './../../shared/app/app.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = 'http://localhost:3001/upload';

//const URL='http://104.236.9.249:3001/upload';

// const URL: string = 'http://162.243.111.79:3001';

@Component({
  selector: 'rv-edit-about-user',
  templateUrl: './edit-about-user.component.html',
  styleUrls: ['./edit-about-user.component.scss']
})
export class EditAboutUserComponent implements OnInit {

  rForm: FormGroup;
  userDetails: any = [];
  logindata: any;
  public uploader:FileUploader = new FileUploader({url: URL});
  fileName: String;
  userID: any = [];


  constructor(private app: AppComponent,
              public router:Router,
              private fb: FormBuilder,
              public apiService:ApiService,
              private formBuilder: FormBuilder
              ) {
                      if (this.logindata  === null ) {
                        console.log();
                      } else {
                        this.logindata = JSON.parse(localStorage.getItem('user'));
                      }

                      let phone_pattern = '[0-9]*' ;

                this.rForm = fb.group({
                    'photo' : [null],
                    'firstname' : [null],
                    'lastname' : [null],
                    'about_user_description' : [null],
                    'user_address' : [null],
                    'user_contact_no' : [null, [Validators.required, Validators.pattern(phone_pattern), Validators.minLength(10), Validators.maxLength(10)]],
                });
              }

  ngOnInit() {
      if (this.logindata  !== null ) {
        const id = this.logindata.id;
        this.getUserData(id);
     }
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
           //console.log("ImageUpload:uploaded:", item, status, response);
        //   console.log(response);
           const responseResult = JSON.parse(response);
           this.fileName = responseResult.filename;
           console.log(this.fileName);
        //   console.log(responseResult.filename);
     }
  }

  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.userDetails = res;
    });
  }

  onSubmitUserDetails(){
    const photo = {'photo': this.fileName};
    const user123 = JSON.parse(localStorage.getItem('user'));
    let id = user123.id
    const user_data = Object.assign({}, this.rForm.value, photo);
    console.log(id);
    console.log(user_data);

    this.apiService.updateUser(id, user_data).then((result) => {
      // let id = result['_id'];
      let id = result;
      console.log(id);
      this.router.navigate(['user-dashboard/about']);
    }, (err) => {
      console.log(err);
    });
  }


}
