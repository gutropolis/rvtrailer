import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {Router} from '@angular/router';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'rv-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderFilterComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  colorTheme = 'theme-red';
  bsConfig: Partial<BsDatepickerConfig>;
 
  isOpen = false;
  isOpen2=false;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean;
  public focus: boolean;
  searchForm:any;
  bsValue: Date = new Date();
  mydate:Date;
  minDate: Date = new Date();;
   //content of searchbox field
   data:Date;
   data2:Date;
   startdate:Date;
   enddate:Date;
   searchFieldValue: string = "";
   bsDatepicker:String;
   onValueChange(value: Date): void {
   
    this.data = value;

    if(this.data != null)
    {
      this.data2= new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1);
      this.isOpen2 = true;
     // this.isOpen = false;
   //this.data.setDate(this.data.getDate()+1)
    }
   
   }
   onValueChangeV2(value: Date): void {
   
    this.isOpen2 = false;
    }
   
    
   /*onValueChange(value: Date): void {
    
    this.data = value;
   // this.mydate=this.data;
   // this.mydate.setDate(this.mydate.getDate() + 1);
   }
   */
   mydata=this.data;
 

  //router:Router;
  constructor(private fb: FormBuilder, public router: Router,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    //this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.searchForm = this.fb.group({
      'location': [null, Validators.required],
      'from': [null, Validators.required],
      'to': [null, Validators.required],

    });
   }

  ngOnInit() {
  
   console.log(this.mydata);
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
   // this.isOpen = true;
   console.log('its location'+this.searchFieldValue)
   
    if (this.searchFieldValue != "")
       this.searchFieldValue=this.searchElement.nativeElement.value;
      

  }

  itsmydate()
  {
    this.mydate=this.data;
    console.log('its my date'+this.minDate);
  }




  
  searchLocation() {
    console.log(this.searchForm.value);
   console.log(this.searchElement.nativeElement.value);
    let formValues = this.searchForm.value;
   console.log(formValues);
   
  // let tosearch =formValues.to.date.year+"-"+formValues.to.date.month+"-"+formValues.to.date.day;
  // let fromsearch =formValues.from.date.year+"-"+formValues.from.date.month+"-"+formValues.from.date.day;
   
   //console.log('this is my date : '+this.mydate.datepicker({ dateFormat: 'dd-mm-yy' }).val());
   
   // this.mydate=new Date(tosearch);
   // this.bsValue=new Date(fromsearch);

   // console.log('time format change by thakur'+this.bsValue);

      this.router.navigate(['/rv'], { queryParams: 
        {
          location: this.searchElement.nativeElement.value,
         // location:'zirakpur',
         dateFrom:this.searchForm.value.from,
         dateTo: this.searchForm.value.to,
          homeSearch: true
        }
        
        });
          
     // console.log('here is day'+formValues.to.date.day);
        return false;

//this.router.navigate(['/rvs']);
  }
  aplytheme()
  {
    console.log('Hello apply theme');
  }
  


}
