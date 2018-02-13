import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormArray, NgForm ,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = 'http://localhost:3001/upload';
// const URL = 'http://162.243.111.79:3001/upload';

@Component({
  selector: 'rv-admin-add-list-trailer',
  templateUrl: './admin-add-list-trailer.component.html',
  styleUrls: ['./admin-add-list-trailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddListTrailerComponent implements OnInit {

rForm: FormGroup;
listings: any = [];
adminfeatures: any = [];
rental: any = [];
trailerTypes: any = [];
type_of_rv : any = [];

public rentalType: string = 'RV Cottage';
public rentalTypeID: string = '';
user: {};
//listingFeatures: any[] = [{feature: 'Wifi'}, {feature: 'Built-in Speakers'}, {feature: 'TV/DVD'}, {feature: 'CD Player'}, {feature: 'Vanity'}, {feature: 'Pet Friendly'}, {feature: 'Dish Washer'}, {feature: 'Bathtub'}, {feature: 'Family/Kid Friendly'}, {feature: 'Outside Shower'}, {feature: 'Smoke Free'}, {feature: 'Bluetooth'},
//{feature: 'Pull-out sofa Bed'}, {feature: 'Outdoor Kitchenette'}, {feature: 'Delivery Avilable'}, {feature: 'Lines Provided'}, {feature: 'Heating / Cooling'}, {feature: 'BBQ'}, {feature: 'Automatic Awning'}, {feature: 'Camping Chairs'}, {feature: 'Basic Cookwaer / Cultery'},
//{feature: 'Closets & Storage Space'}, {feature: 'Full Winter Rental Avilable'}, {feature: 'Boardgames and Movies'}];
public uploader:FileUploader = new FileUploader({url: URL});
fileName: String;

  constructor(private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService) {

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
          'details_feature' : this.fb.array([]),
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
    




          //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                //console.log("ImageUpload:uploaded:", item, status, response);
           //   console.log(response);
              const responseResult = JSON.parse(response);
              this.fileName = responseResult.filename;
              console.log(this.fileName);

              
           //   console.log(responseResult.filename);
      }
    }
    getFeature() {
      this.apiService.getAllFeature().then((res) => {
        this.adminfeatures = res;
        console.log(this.adminfeatures);
        }, (err) => {
        console.log(err);
      });
    }

  onSubmitListTrailer() {
    let rv_type = {'rv_type': this.rentalType,'rentalTypeID':this.rentalTypeID};
    console.log(rv_type);
  let rentalTypeID={'rentalTypeID':this.rentalTypeID};
  console.log("MyRental id");
  console.log(rentalTypeID);

    console.log(this.fileName);
    const photo = {'photo': this.fileName};

    const detail = this.rForm.value;
    this.listings['details_feature'] = detail.details_feature;
    const Listing_Data = Object.assign({},this.listings,detail,rentalTypeID, photo,rv_type);
    console.log(Listing_Data);

    this.apiService.addListTrailer(Listing_Data).subscribe((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
      this.router.navigate(['admin/list-trailer']);
    }, (err) => {
      console.log(err);
    });
  }
  onChange(feature: string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.rForm.controls.details_feature;
    if (isChecked) {
      emailFormArray.push(new FormControl(feature));
    } else {
      const index = emailFormArray.controls.findIndex(x => x.value === feature);
      emailFormArray.removeAt(index);
    }
}
  


}
