import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
 
import {Router} from '@angular/router';

@Component({
  selector: 'rv-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderFilterComponent implements OnInit {


  public myForm: FormGroup; // our model driven form
  public submitted: boolean;
  searchForm:any;
  bsValue: Date = new Date();
  //router:Router;
  constructor(private fb: FormBuilder, public router: Router) {

    this.searchForm = this.fb.group({
      'location': ['', Validators.required],
      'from': [''],
      'to': [''],

    });
   }

  ngOnInit() {
  }

  searchLocation() {
    console.log(this.searchForm.value);
    let formValues = this.searchForm.value;
    this.router.navigate(['/rv', {
      location: formValues.location,
      from: formValues.from,
      to: formValues.to,
      homeSearch: true
      }]);

    //this.router.navigate( [ 'Details', { id: company.id }] );
    return false;

  }

}
