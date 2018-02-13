import { GlobaldataService } from './../../globaldata.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm,FormArray,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-view-list-trailer',
  templateUrl: './admin-view-list-trailer.component.html',
  styleUrls: ['./admin-view-list-trailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminViewListTrailerComponent implements OnInit {

rForm: FormGroup;
 listtrailers: any = [];
 adminfeatures: any = [];

 rental: any = [];
 //myrental: any = [];
 trailerTypes: any = [];
 type_of_rv : any = [];
//rentalTypeID: any = [];
  public rentalType: string = 'RV Cottage';
 public rentalTypeID: string = '';
 //public rentalID: string = '';
 

 listingFeatures: any[] = [
     {feature: 'Brijesh'},
     {feature: 'Kirti'},
    

];

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute,
              private gd: GlobaldataService) {
                

      this.rForm = fb.group({
          'specification_make' : [null, Validators.required],
          'specification_model' : [null, Validators.required],
          'specification_year' : [null, Validators.required],
          'specification_length' : [null, Validators.required],
          'specification_gross_weight' : [null, Validators.required],
          'specification_tough_weight' : [null, Validators.required],
          'specification_guest' : [null, Validators.required],
          'specification_slide_out' : [null, Validators.required],
          'location_street' : [null, Validators.required],
          'location_city' : [null, Validators.required],
          'location_province' : [null, Validators.required],
          'location_postal' : [null, Validators.required],
          'details_ad_title' : [null, Validators.required],
          'details_ad_description' : [null, Validators.required],
          'details_feature' : [null, Validators.required],
          'details_no_of_beds' : [null, Validators.required],
          'details_no_of_bathrooms' : [null, Validators.required],
          'pricing_security_deposit' : [null, Validators.required],
          'pricing_delivery_charges' : [null, Validators.required],
          'pricing_high_rate_hour' : [null, Validators.required],
          'pricing_high_rate_week' : [null, Validators.required],
          'pricing_high_rate_month' : [null, Validators.required],
          'pricing_low_rate_hour' : [null, Validators.required],
          'pricing_low_rate_week' : [null, Validators.required],
          'pricing_low_rate_month' : [null, Validators.required],
          'pricing_highest_season_date_range_from' : [null, Validators.required],
          'pricing_highest_season_date_range_to' : [null, Validators.required],
          'photo' : [null],
          'type_of_rv':[null],
          
    });


    this.getFeature();
    this.getRental();
    console.log("rental id");
    console.log( this.listtrailers.rentalTypeID);

   

  }
  onSelectRentalType(rentalType,rentalTypeID){
	  console.log(rentalType);
	   console.log(rentalTypeID);
	  this.rentalType=rentalType;   
	  this.rentalTypeID=rentalTypeID;   
	  
	   this.trailerTypes = this.rental.filter( book => book.rental_type === rentalTypeID);
	  //console.log(this.trailerTypes);
	  
  }
  getRental() {
    this.apiService.getAllRental().then((res) => {
      this.rental = res;
     // this.trailerTypes=this.rental;
      //console.log("this is my");
     // console.log(this.trailerTypes);
      console.log(this.rental);
      }, (err) => {
      console.log(err);
    });
  }

  getTrailerByRental(){

   
	  console.log('i a her'+this.rentalTypeID);
	  this.apiService.getRvTypeByRental(this.rentalTypeID).then((res) => {
      this.trailerTypes = res;
     // console.log(this.trailerTypes);
      }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
         
      this.onSubmitListTrailer(this.route.snapshot.params['id']);

      
     
      console.log("rental id init function");
     // this.rentalTypeID= this.gd.ListingObj['global'];
      this.rentalTypeID="5a79520979a44131754d8d55 ";
     console.log( this. rentalTypeID);
     this.getTrailerByRental();

  }
  getFeature() {
    this.apiService.getAllFeature().then((res) => {
      this.adminfeatures = res;
      console.log(this.adminfeatures);
      }, (err) => {
      console.log(err);
    });
  }

  onSubmitListTrailer(id) {
    this.apiService.showListTrailer(id).subscribe((res) => {
      this.listtrailers = res;
      this.rentalType  = this.listtrailers.rv_type;
      this. rentalTypeID=this.listtrailers.rentalTypeID;
      this.gd.ListingObj['global']=this.rentalTypeID;

      this.trailerTypes = this.rental.filter( book => book.rental_type === this.rentalTypeID);

      console.log("this is rental type ");
      console.log(this.rentalType);
      console.log("this is rental id ");
      console.log(this. rentalTypeID);

      
    }, (err) => {
      console.log(err);
    });
    
  }

  updateListTrailerData(id) {
    this.apiService.updateListTrailer(id, this.listtrailers).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/user']);
    }, (err) => {
      console.log(err);
    });
  }
  onChange(feature_name: string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.rForm.controls.details_feature;
    if (isChecked) {
      emailFormArray.push(new FormControl(feature_name));
    } else {
      const index = emailFormArray.controls.findIndex(x => x.value === feature_name);
      emailFormArray.removeAt(index);
    }
}





}

