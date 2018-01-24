import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobaldataService } from './../../globaldata.service';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-trailer-location',
  templateUrl: './trailer-location.component.html',
  styleUrls: ['./trailer-location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrailerLocationComponent implements OnInit {

  rForm: FormGroup;
  listing: any = [];
  allListing: any = [];

   

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private gd: GlobaldataService) {

                //this.listing = this.gd.ListingObj['global'];
               
                this.allListing = this.gd.ListingObj['global'];
                if (this.allListing === undefined) {
                    console.log();
                    //alert('undefiend');
                } else {

                  //alert('hello');

                  this.listing = this.gd.ListingObj['global'];
                  
                }

                console.log('Location Data');
               // alert(JSON.stringify(this.listing));
                console.log(this.listing);
                

                this.rForm = this.fb.group({
                  'location_street' : [null, Validators.required],
                  'location_city' : [null, Validators.required],
                  
                  //'location_province' : [null, Validators.required],
                  //'location_postal' : [null, Validators.required],
              });
              
                
              }

  ngOnInit() {
    

      this.allListing.location = this.gd.ListingObj['global'].location;
   
    
  }

  onSubmitLocation() {
    const record=this.rForm.value;
    
     // this.gd.ListingObj['global'].location= record;
     // this.listing = this.gd.ListingObj['global'];
     // console.log(this.listing);
      //alert(JSON.stringify(this.listing));
      localStorage.setItem('listing', JSON.stringify(this.listing));
      this.router.navigate(['list-trailer/details']);
  }
  

}
