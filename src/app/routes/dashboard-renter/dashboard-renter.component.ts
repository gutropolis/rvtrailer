import { AppComponent } from './../../shared/app/app.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-dashboard-renter',
  templateUrl: './dashboard-renter.component.html',
  styleUrls: ['./dashboard-renter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardRenterComponent implements OnInit {

  constructor(private app: AppComponent,
              public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder,
              private flashMessagesService: FlashMessagesService)
              {
                  this.app.brandSlideVisible = false;
   }


  ngOnInit() {
  }

  onLogoutClick() {
    this.apiService.logout();
    this.flashMessagesService.show('You are Logged Out', {cssClass: 'alert-info'});
    this.router.navigate(['']);
  }

}
