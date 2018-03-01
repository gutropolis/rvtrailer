import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, Validators, FormBuilder,FormArray, NgForm ,FormControl} from '@angular/forms';
import { ApiService } from './../../api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'rv-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {
  @Output() myFilter = new EventEmitter() ;
  rental :any=[];
  Listing: any;
  location:any=[];
  public mystates:any;
  public myLocation:string[];
  public states:string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming','Punjab','Kurukestra','Hariyana'];
    rForm: FormGroup;
  public price: any;
  constructor(public apiService: ApiService,private fb: FormBuilder,private activatedRoute:ActivatedRoute) { 

    this.rForm = fb.group({
      'location':[null]
     });
       this.apiService.getCity().subscribe((res) => {
       this.myLocation = res;
       //console.log("now location is ");
      
       //console.log(this.myLocation);
       this.mystates = this.myLocation.map(function(a) {
         return a["location_city"];
        });
       //console.log("after Maping");
       //console.log(this.mystates);
         
       });

    this.getRental();
    //this.location='mylocation';
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.location= params['location'];
      let from=params['from'];
      let to=params['to'];
      console.log('myrecord after click home search');
      console.log(from);
      console.log(to);
      console.log(this.location);
      console.log(params);
     
    });    
        
   }
   getRental() {
    this.apiService.getAllRental().then((res) => {
      this.rental = res;
      console.log(this.rental);
      }, (err) => {
      console.log(err);
    });
  }

  filterSearch(form) {
    let filterParams: any = {
      location: form.value.location,
      dateFrom: form.value.dateFrom.formatted,
      dateTo: form.value.dateTo.formatted,
      numberOfGuest: form.value.numberOfGuest
      };
    filterParams.traveltrailer = form.value.traveltrailer;
    filterParams.fifthwheel = form.value.fifthwheel;
    filterParams.tentrailer = form.value.tentrailer;
    filterParams.vintagetrailer = form.value.vintagetrailer;
    filterParams.hybridtrailer = form.value.hybridtrailer;
    filterParams.toytrailer = form.value.toytrailer;
    filterParams.price = this.price;
    //console.log(filterParams);
     // alert("hello");
    this.myFilter.emit(filterParams);

  }

  myOnFinish(event) {
    this.price = event.from;
  }


}
