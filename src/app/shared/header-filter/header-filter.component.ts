import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {Router} from '@angular/router';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
@Component({
  selector: 'rv-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderFilterComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  


  public myForm: FormGroup; // our model driven form
  public submitted: boolean;
  searchForm:any;
  bsValue: Date = new Date();
  mydate:any=[];
  //router:Router;
  constructor(private fb: FormBuilder, public router: Router,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    this.searchForm = this.fb.group({
      'location': [null, Validators.required],
      'from': [null,Validators.required],
      'to': [null,Validators.required],

    });
   }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

        autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         if(place.geometry === undefined || place.geometry === null ){
          return;
         }
        });
        });
      }
         );
         
  }

  searchLocation() {
    console.log(this.searchForm.value);
    let formValues = this.searchForm.value;
   this.mydate=formValues.from;
   
   
   console.log('this is my date : '+this.mydate.datepicker({ dateFormat: 'dd-mm-yy' }).val());
    this.router.navigate(['/rv', {
      location: formValues.location,
      from:formValues.from,
      to: formValues.to,
      homeSearch: true
      }]);

        return false;

  }

}
