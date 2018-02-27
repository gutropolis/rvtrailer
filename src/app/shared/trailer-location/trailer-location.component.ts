import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobaldataService } from './../../globaldata.service';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
@Component({
  selector: 'rv-trailer-location',
  templateUrl: './trailer-location.component.html',
  styleUrls: ['./trailer-location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrailerLocationComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  rForm: FormGroup;
  listing: any = [];
  allListing: any = [];
  searchFieldValue: string = "";
  locationstreet: any =[];
  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private gd: GlobaldataService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

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
                  
                  'location_province' : [null, Validators.required],
                  'location_postal' : [null, Validators.required],
              });
              
                
              }

  ngOnInit() {
    

      
    
      this.mapsAPILoader.load().then(
        () => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
  
          autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
           //console.log(place);
           if(place.geometry === undefined || place.geometry === null ){
            return;
           } 
          });
          });
        }
           );
           this.allListing.location = this.gd.ListingObj['global'].location;
   
    
  }
 
  searchBoxChanged () {
    // console.log(this.searchFieldValue)
     
     if (this.searchFieldValue != "")
        this.searchFieldValue=this.searchElement.nativeElement.value;
   }

  onSubmitLocation() {
   // this.locationstreet={'location_street': this.searchElement.nativeElement.value};
    const record=this.rForm.value;
    
     // this.gd.ListingObj['global'].location= record;
     // this.listing = this.gd.ListingObj['global'];
     // console.log(this.listing);
     // alert(JSON.stringify(this.listing));
      localStorage.setItem('listing', JSON.stringify(this.listing));
      this.router.navigate(['list-trailer/details']);
  }
  

}
