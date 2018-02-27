
import { GlobaldataService } from './../../globaldata.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-trailer-pricing',
  templateUrl: './trailer-pricing.component.html',
  styleUrls: ['./trailer-pricing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrailerPricingComponent implements OnInit {

  rForm: FormGroup;
  listing: any = [];
  allListing: any = [];


    constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private gd: GlobaldataService) {
                
                this.allListing = this.gd.ListingObj['global'];
                if (this.allListing === undefined) {
                    console.log();
                } else {
                  this.listing =this.gd.ListingObj['global'];
                }

                console.log('step 4');
                console.log(this.listing);
                //alert(JSON.stringify(this.listing));

                this.rForm = fb.group({
                    'pricing_security_deposit' : [null],
                    'pricing_delivery_charges' : [null],
                    'pricing_high_rate_hour' : [null],
                    'pricing_high_rate_week' : [null],
                    'pricing_high_rate_month' : [null],
                    'pricing_low_rate_hour' : [null],
                    'pricing_low_rate_week' : [null],
                    'pricing_low_rate_month' : [null],
                    'pricing_highest_season_date_range_from' : [null],
                    'pricing_highest_season_date_range_to' : [null],
                    
                    'unavailability_from':[null],
                    'unavailability_to':[null],

                });
              }

  ngOnInit() {
    this.allListing.pricing = this.gd.ListingObj['global'].pricing;

  }

  onSubmitPricing() {
    //const pricingSubmit = this.rForm.value;
    //this.gd.ListingObj['global'].pricing=pricingSubmit;
   //  this.listing = this.gd.ListingObj['global'];
    // console.log(this.listing);
    // console.log(this.listing);
     //alert( JSON.stringify(this.listing));
     localStorage.setItem('listing', JSON.stringify(this.listing));
     this.router.navigate(['list-trailer/photo']);
  }

}
