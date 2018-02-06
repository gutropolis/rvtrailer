import { GlobaldataService } from './../../globaldata.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-trailer-specification',
  templateUrl: './trailer-specification.component.html',
  styleUrls: ['./trailer-specification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrailerSpecificationComponent implements OnInit {

  rForm: FormGroup;
  rental: any = [];
  trailerTypes: any = [];
  users: any = [];
  user: any = [];
  listing: any = [];
  getListing: any = [];
  logindata: any = [];
  allListing: any = [];

    specification_make : any = [];
    specification_model : any = [];
    specification_year : any = [];
    specification_length : any = [];
    specification_gross_weight : any = [];
    specification_tough_weight : any = [];
    specification_guest : any = [];
    specification_slide_out : any = [];


  public rentalType: string = 'RV Cottage';
   public rentalTypeID: string = '';
  
  RV_Cottage : string = 'RV Cottage';
  Travel_Trailer : string = 'Travel Trailer';
  Motor_Home : string = 'Motor Home';
  public trailerType = 'RV Cottage';
  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private gd: GlobaldataService) {
                  this.listing = this.gd.ListingObj['global'];
                  console.log(this.listing);
                  //alert(this.listing);
                  this.getRental();

  }
  
  getTrailerTypes(rentalTypeID){
	    
  }
  
  
  onSelectRentalType(rentalType,rentalTypeID){
	  console.log(rentalType);
	   console.log(rentalTypeID);
	  this.rentalType=rentalType;   
	  this.rentalTypeID=rentalTypeID;   
	  
	   this.trailerTypes = this.rental.filter( book => book.rental_type === rentalTypeID);
	  console.log(this.trailerTypes);
	  
  }
  
  getRental() {
    this.apiService.getAllRental().then((res) => {
      this.rental = res;
      console.log(this.rental);
      }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {

    this.allListing = this.gd.ListingObj['global'];
    if (this.allListing === undefined) {
        console.log();
    } else {
      this.listing = this.gd.ListingObj['global'];
      this.specification_make = this.listing.specification_make;
      this.specification_model = this.listing.specification_model;
      this.specification_year = this.listing.specification_year;
      this.specification_length = this.listing.specification_length;
      this.specification_gross_weight = this.listing.specification_gross_weight;
      this.specification_tough_weight = this.listing.specification_tough_weight;
      this.specification_guest = this.listing.specification_guest;
      this.specification_slide_out = this.listing.specification_slide_out;
    }
  }


  onSubmitSpecification({value, valid}) {
   //alert(this.specification_make);
    //alert(this.specification_guest);

    
    
    

      if (this.trailerType == null) {
        this.trailerType = 'RV Cottage';
      }else {
        this.trailerType = this.trailerType;
      }

      let rv_type = {'rv_type': this.trailerType};
      let listingSpecification  =  Object.assign({}, value, rv_type);

     // alert(listingSpecification);


      this.gd.ListingObj['global'] = listingSpecification;
      this.listing = this.gd.ListingObj['global'];
       
      console.log(this.listing);

      //alert(JSON.stringify(this.listing));
      localStorage.setItem('listing', JSON.stringify(this.listing));
      this.router.navigate(['list-trailer/location']);
  }

  trailerspec(value) {
    this.trailerType = value;
    console.log(this.trailerType);
    //alert(this.trailerType);
  }

}
