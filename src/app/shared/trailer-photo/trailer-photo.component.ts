import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { GlobaldataService } from './../../globaldata.service';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
//import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

//const URL = 'http://localhost:3001/upload';

const URL='http://104.236.9.249:3001/upload';

 //const URL: string = 'http://104.236.9.249:3001';


@Component({
  selector: 'rv-trailer-photo',
  templateUrl: './trailer-photo.component.html',
  styleUrls: ['./trailer-photo.component.scss'],
 // directives: [FileUploader],
  encapsulation: ViewEncapsulation.None
})
export class TrailerPhotoComponent implements OnInit {

rForm: FormGroup;
listing: any = [];
public uploader: FileUploader = new FileUploader({url: URL});
fileName: String;
userID: any = [];
userDetails:any=[];
allListing: any = [];
photo: any;
photoname: String;
userDetail: any = [];
DateTime:any=[];
storage:any=[];

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private gd: GlobaldataService) {

                this.allListing = localStorage.getItem('listing');

                if (this.allListing === null || this.allListing.length === 0) {
                    console.log();
                } else {
                  this.listing = JSON.parse(localStorage.getItem('listing'));
                }

                console.log('step5');
                console.log(this.listing);
                //alert(JSON.stringify(this.listing));
                this.rForm = fb.group({
                    'photo' : [null],
                });
              }


        ngOnInit() {
          this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
          this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            // console.log("ImageUpload:uploaded:", item, status, response);
            //  console.log(response);
               const responseResult = JSON.parse(response);
                this.fileName = responseResult.filename;
                console.log(this.fileName);
          };
        }


  onSubmitPhoto() {
    if (this.fileName === null || this.fileName === undefined) {
      this.photoname = 'noimage.jpg';
      this.photo = {'photo': this.photoname};
    } else {
      this.photo = {'photo': this.fileName};
    }

    this.userID = JSON.parse(localStorage.getItem('user'));

    
   


  ;
    this.DateTime={'created_at':Date.now()};
    console.log(this.DateTime);
    this.apiService.showUser(this.userID.id).subscribe((res) => {
      this.userDetails = res;
      const alllistemail = Object.assign({},{email: this.userDetails.email},{firstname: this.userDetails.firstname},{lastname:this.userDetails.lastname});
      this.apiService.TrailerListbyEmail(alllistemail).subscribe((result) => {
        //console.log(this.rForm.value);
        console.log('send email also');
        
       
         });
   
    const photo_data = Object.assign({}, this.listing, this.photo,this.DateTime, {user_id: this.userID.id},{owner_name: this.userDetails.firstname},{owner_email:this.userDetails.email});
    console.log(photo_data);
    //alert(JSON.stringify(photo_data));
    this.apiService.addListTrailer(photo_data).subscribe((result) => {
      const id = result['_id'];
      this.router.navigate(['/rv']);
     }, (err) => {
      console.log(err);
    });
  });


 // this.storage = JSON.parse(localStorage.getItem('listing'));

console.log('before listing'+this.allListing);
 localStorage.removeItem('listing');
 localStorage.removeItem('global');
 console.log('after listing'+JSON.parse(localStorage.getItem('listing')));
 this.storage=null;
 this.gd.ListingObj['global']=this.storage;

  }

}
