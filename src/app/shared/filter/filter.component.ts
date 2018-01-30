import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent {
  @Output() myFilter = new EventEmitter() ;

  Listing: any;
  public myLocation: any = [];
  public states:string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming','Punjab','Hariyana','London'];

  public price: any;
  constructor(public apiService: ApiService) { 
   
      this.apiService.getAllListTrailer().subscribe((res) => {
      this.myLocation = res;
      alert(this.myLocation)
      });
     
  }

  filterSearch(form) {
    let filterParams: any = {
      location: form.value.location,
      dateFrom: form.value.dateFrom.formatted,
      dateTo: form.value.dateTo.formatted,
      numberOfGuest: form.value.numberOfGuest
      };
    filterParams.traveltrailer = form.value.traveltrailer;
    filterParams.fifthwheel = form.value.fifthwheel;
    filterParams.tentrailer = form.value.tentrailer;
    filterParams.vintagetrailer = form.value.vintagetrailer;
    filterParams.hybridtrailer = form.value.hybridtrailer;
    filterParams.toytrailer = form.value.toytrailer;
    filterParams.price = this.price;
    //console.log(filterParams);
      alert(JSON.stringify(filterParams));
    this.myFilter.emit(filterParams);

  }


  myOnFinish(event) {
    this.price = event.from;
    
    
  }

  

}
