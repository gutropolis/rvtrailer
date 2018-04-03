import { Component, ViewEncapsulation,Renderer, Output, EventEmitter } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, Validators, FormBuilder,FormArray, NgForm ,FormControl} from '@angular/forms';
import { ApiService } from './../../api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

import { ViewChild, ElementRef, NgZone } from '@angular/core';
@Component({
  selector: 'rv-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {
  @ViewChild('search') public searchElement: ElementRef;
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
  searchFieldValue: string = "";
  constructor(public apiService: ApiService,private fb: FormBuilder,private activatedRoute:ActivatedRoute,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private renderer: Renderer) { 
    this.renderer.setElementProperty(document.body, "scrollTop", 0);

    this.rForm = fb.group({
      'location':[null],
      'details_feature' : this.fb.array([]),
     });
      // this.apiService.getCity().subscribe((res) => {
      // this.myLocation = res;
       //console.log("now location is ");
      
       //console.log(this.myLocation);
     //  this.mystates = this.myLocation.map(function(a) {
         //return a["location_city"];
       // });
       //console.log("after Maping");
       //console.log(this.mystates);
         
     //  });

     this.mapsAPILoader.load().then(
      () => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

        autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         console.log(place);
         if(place.geometry === undefined || place.geometry === null ){
          return;
         } 
        });
        });
      }
         );




    this.getRental();
    //this.location='mylocation';
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchFieldValue= params['location'];
      let dateFrom=params['dateFrom'];
      let dateTo=params['dateTo'];
      console.log('myrecord after click home search');
      console.log(dateFrom);
      console.log(dateTo);
      console.log(this.searchFieldValue);
      console.log(params);
     
    });    
        
   }
   searchBoxChanged () {
    console.log(this.searchFieldValue)
     
     if (this.searchFieldValue != "")
        this.searchFieldValue=this.searchElement.nativeElement.value;
       // console.log(this.searchFieldValue);
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
    console.log("my type of rv"+this.rForm.value.details_feature);

    let filterParams: any = {
     
      location: this.searchElement.nativeElement.value,
      dateFrom:new Date(form.value.dateFrom.formatted),
      dateTo:new Date(form.value.dateTo.formatted),
      numberOfGuest: form.value.numberOfGuest,
      type_of_rv:this.rForm.value.details_feature
      };
    filterParams.traveltrailer =form.value.details_feature;
    filterParams.fifthwheel = form.value.fifthwheel;
    filterParams.tentrailer = form.value.tentrailer;
    filterParams.vintagetrailer = form.value.vintagetrailer;
    filterParams.hybridtrailer = form.value.hybridtrailer;
    filterParams.toytrailer = form.value.toytrailer;
    filterParams.price = this.price;
    //console.log(filterParams);
     // alert("hello");
    // console.log('check type of rv'+this.rForm.value.details_feature);
    this.myFilter.emit(filterParams);
    this.renderer.setElementProperty(document.body, "scrollTop", 0);

  }

  myOnFinish(event) {
    this.price = event.from;
  }

  onChange(type_of_rv: string, isChecked: boolean) {
   
    const abc = <FormArray>this.rForm.controls.details_feature;
    console.log(abc);
    if (isChecked) {
      abc.push(new FormControl(type_of_rv));
      console.log('type of rv'+type_of_rv);
    } else {
      const index = abc.controls.findIndex(x => x.value === type_of_rv);
      abc.removeAt(index);
    }
}


}
