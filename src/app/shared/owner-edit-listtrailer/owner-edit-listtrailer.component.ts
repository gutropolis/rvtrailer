import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormArray, NgForm ,FormControl} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
//const URL = 'http://localhost:3001/upload';
 const URL = 'http://162.243.111.79:3001/upload';
@Component({
  selector: 'rv-owner-edit-listtrailer',
  templateUrl: './owner-edit-listtrailer.component.html',
  styleUrls: ['./owner-edit-listtrailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerEditListtrailerComponent implements OnInit {
  rForm: FormGroup;
  listtrailers: any = [];
  listings: any = [];
  adminfeatures: any = [];
  myfeatures: any = [];
  details_feature:any=[];

  rental: any = [];
  trailerTypes: any = [];
  type_of_rv : any = [];
   public rentalType: string = 'RV Cottage';
  public rentalTypeID: string = '';
  public uploader:FileUploader = new FileUploader({url: URL});
  fileName: String='';
  
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { 
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
        'photo' :[null],
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
      //console.log(this.trailerTypes);
      
    }

    getRental() {
      this.apiService.getAllRental().then((res) => {
        this.rental = res;
       // this.trailerTypes=this.rental;
        //console.log("this is my");
       // console.log(this.trailerTypes);
        //console.log(this.rental);
        }, (err) => {
        console.log(err);
      });
    }
  

  ngOnInit() {
    this.onSubmitListTrailer(this.route.snapshot.params['id']);

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
      this.details_feature = res;
     
     console.log(this.details_feature);
      }, (err) => {
      console.log(err);
    });
  }

  onSubmitListTrailer(id) {
    this.apiService.showListTrailer(id).subscribe((res) => {
      this.listtrailers =res;
	  this.rentalType  = this.listtrailers.rv_type;
	  this.rentalTypeID=this.listtrailers.rentalTypeID;
	  
	  //add checkbox value//
	  
	   const emailFormArray = <FormArray>this.rForm.controls.details_feature;
	  
	  const trailerDetailArray=this.listtrailers.details_feature;
	   trailerDetailArray.forEach(function (value) {
       console.log("old feature value");
			console.log(value);
			emailFormArray.push(new FormControl(value));
			console.log(emailFormArray);
	  }); 
	  
     
	//end here
	  
	  
	  
    //this.trailerTypes=this.listtrailers.type_of_rv;
    //console.log(this.listtrailers.type_of_rv);
	  
	    console.log(this.rentalType);
     console.log(this.rentalTypeID);
     console.log(this.listtrailers);

     this.getTrailerByRental();
    }, (err) => {
      console.log(err);
    });
  }

  updateListTrailerData(id) {
    const detail = this.rForm.value;
    console.log(this.fileName);
    const photo = {'photo': this.fileName};
    let rv_type = {'rv_type': this.rentalType,'rentalTypeID':this.rentalTypeID};
    console.log(rv_type);
    this.listings['details_feature'] = detail.details_feature;
    //this.listings['details_feature'] =this.myfeatures;
    const Listing_Data = Object.assign({},this.listings,detail,rv_type,photo);
    console.log(Listing_Data);

    this.apiService.updateListTrailer(id,Listing_Data).then((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
      this.router.navigate(['/user-dashboard/my-ads']);
    }, (err) => {
      console.log(err);
    });
  }

  onChange(feature: string, isChecked: boolean) {
    
     const emailFormArray = <FormArray>this.rForm.controls.details_feature;
     if (isChecked) {
       
       emailFormArray.push(new FormControl(feature));
       console.log(emailFormArray);
     } else {
       const index = emailFormArray.controls.findIndex(x => x.value === feature);
       emailFormArray.removeAt(index);
     }
 }

 getTrailerByRental(){
  console.log('i a her'+this.rentalTypeID);
  this.apiService.getRvTypeByRental(this.rentalTypeID).then((res) => {
    this.trailerTypes = res;
    console.log(this.trailerTypes);
    }, (err) => {
    console.log(err);
  });
}

}
