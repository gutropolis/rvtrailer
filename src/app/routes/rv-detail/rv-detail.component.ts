import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { RecaptchaModule } from 'ng2-recaptcha';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ApiService } from './../../api.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from "fullcalendar";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'rv-detail',
  templateUrl: './rv-detail.component.html',
  styleUrls: ['./rv-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RvDetailComponent implements OnInit {
  public loading = false;

  renterdetail: any = [];

  public max: number = 5;
  public rate: number = 4;
  public isReadonly: boolean = true;
  public features: string[];
  from:String="";
  to:String="";
  calendarOptions: Object = {};
 
  /*   
  calendarOptions: Object = {
    defaultDate: '2018-03-10',
    defaultView: 'month',
    events: [
      {
        start: '2018-03-10',
        end: '2018-03-22',
        rendering: 'background'
      }
    ]
  };
*/



  public isFavourite = true;
  public favourite = {};
  public fav_id: string;
  private listing_id: string;
  private user_id: string;
  saveSuccess: boolean;
  users:any=[];
  rentalusername:any=[];
  rateid:any='5aaba714ac6d5a11d453a1e3';
  ratings:Number=2.5;
  constructor(private app: AppComponent,
              public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute,
              private flashMessagesService: FlashMessagesService,private datePipe: DatePipe
              
              ) {
                  this.app.brandSlideVisible = false;

                  this.route.queryParams.subscribe((params: Params) => {
                   
                    this.from=params['from'];
                    this.to=params['to'];
                    console.log('myrecord after click home search');
                    console.log(this.from);
                    console.log(this.to);
                    let today=Date();
                    let newdate=this.datePipe.transform(today,"yyyy-MM-dd");
                    console.log('this is change format'+newdate);
                   // let enddate=this.datePipe.transform(this.listtrailers.unavailability_to,"yyyy-MM-dd");
                    if(this.from == undefined || this.from < newdate)
                    {
                      this.from= Date();
                      console.log('My undefind date is '+this.from);
                    }
                   // console.log(this.location);
                    console.log(params);
                   
                    this.calendarOptions = {
                      defaultDate: this.from,
                      defaultView: 'month',
                      events: [
                        {
                          start:this.from,
                          end:this.to,
                          rendering: 'background'
                        }
                      ]
                    };

                  });    
                  
                 
            }

              brandSlideVisible: boolean;

  ngOnInit() {
    this.brandSlideVisible = true;
    this.getRenterDetail(this.route.snapshot.params['id']);
    this.listing_id = this.route.snapshot.params['id'];
    this.checkFavourite();
   

  }
 


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
}

onSubmit(form) {

console.log(this.listing_id);

  form.value.listing_id = this.listing_id;
  form.value.listings_user_id = this.user_id;
  let senderID = JSON.parse(localStorage.getItem('user'));
  
  if(senderID === null) {
   this.router.navigate(['/signup/renter']);
   alert("Please Login before Contact for Trailer");
  }

  form.value.sender_id = senderID.id;

  form.value.recivername=this.rentalusername;
  form.value.sendername=senderID.username;
  form.value.parent_id = 0;
  console.log(form.value);

  this.apiService.createMessage(form.value)
  .subscribe( (response) => {
    if (response) {
        this.saveSuccess = true;
        setTimeout(function() {
        this.saveSuccess = false;
        }.bind(this), 3000);
    } else {
        this.saveSuccess = false;
    }
  });
}

  getRenterDetail(id) {
    this.loading = true;
    this.apiService.showListTrailer(id).subscribe((res) => {
      this.loading = false;
      this.renterdetail = res;
      console.log(this.renterdetail);
      this.user_id = this.renterdetail.user_id;

       //get userby id

    this.apiService.showUser(this.user_id).subscribe((res) => {
      this.users = res;
      this.rentalusername=this.users.firstname;
      console.log(this.rentalusername);
    }, (err) => {
      console.log(err);
    });
 
  
      this.features = this.renterdetail.details_feature;




    }, (err) => {
      console.log(err);
    });
  }

  onFavouriteClick() {
    let user = JSON.parse(localStorage.getItem('user'));
    let user_id = user.id;
    let trailer_id =  this.route.snapshot.params['id'];
      const favourite = {
        user_id: user_id,
        trailer_id: trailer_id
      };
      console.log(favourite);

    this.apiService.addFavourite(favourite).subscribe((result) => {
      let id = result['_id'];
      console.log(id);
    }, (err) => {
      console.log(err);
    });

    location.reload();

  }

  checkFavourite() {

    let user = JSON.parse(localStorage.getItem('user'));
    let user_id = user.id;
    let trailer_id =  this.route.snapshot.params['id'];

    let params = {user_id: user_id, trailer_id: trailer_id };
    console.log(params);

    this.apiService.getFav(params).subscribe((result) => {
      console.log(result);
      if (result === null ) {
        this.isFavourite = false;
        console.log('show fav icon');

      } else {
        console.log('do not show fav icon');
        this.fav_id = result._id;
        this.isFavourite = true;
        console.log(this.fav_id);
      }
    });

  }

  delFav() {
    let id = this.fav_id;
    this.apiService.delFav(id).subscribe((result) => {
        console.log(result);
    });
    location.reload();
  }

  



}
