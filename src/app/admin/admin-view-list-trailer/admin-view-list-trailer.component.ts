import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
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
 listingFeatures: any[] = [
     {feature: 'Brijesh'},
     {feature: 'Kirti'},
];

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
    });

  }

  ngOnInit() {

      this.onSubmitListTrailer(this.route.snapshot.params['id']);
  }

  onSubmitListTrailer(id) {
    this.apiService.showListTrailer(id).subscribe((res) => {
      this.listtrailers = res;
      console.log(this.listtrailers);
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


}

