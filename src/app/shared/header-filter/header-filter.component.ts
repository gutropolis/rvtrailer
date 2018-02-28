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
  mydate:Date;
   //content of searchbox field
   searchFieldValue: string = "";
   
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
         console.log(place);
         if(place.geometry === undefined || place.geometry === null ){
          return;
         } 
        });
        });
      }
         );
         
  }

  searchBoxChanged () {
   console.log(this.searchFieldValue)
    
    if (this.searchFieldValue != "")
       this.searchFieldValue=this.searchElement.nativeElement.value;
  }




  
  searchLocation() {
    console.log(this.searchForm.value);
   console.log(this.searchElement.nativeElement.value);
    let formValues = this.searchForm.value;
   
   let tosearch =formValues.to.date.year+"-"+formValues.to.date.month+"-"+formValues.to.date.day;
   let fromsearch =formValues.from.date.year+"-"+formValues.from.date.month+"-"+formValues.from.date.day;
   
   //console.log('this is my date : '+this.mydate.datepicker({ dateFormat: 'dd-mm-yy' }).val());
   
    this.mydate=new Date(tosearch);
    this.bsValue=new Date(fromsearch);

   // console.log('time format change by thakur'+this.bsValue);

      this.router.navigate(['/rv'], { queryParams: 
        {
          location: this.searchElement.nativeElement.value,
         // location:'zirakpur',
          from:this.bsValue,
          to: this.mydate,
          homeSearch: true
        }
        
        });
          
     // console.log('here is day'+formValues.to.date.day);
        return false;

//this.router.navigate(['/rvs']);
  }
  


}
