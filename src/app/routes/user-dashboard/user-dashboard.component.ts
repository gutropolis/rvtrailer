import { AppComponent } from './../../shared/app/app.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit {


  logindata: any = [];
  user: any = [];
  public isUserTypeRenter = true;

  constructor(private app: AppComponent,
              public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder,
              private flashMessagesService: FlashMessagesService
              ) {
                    this.app.brandSlideVisible = false;
                      if(this.logindata  === null ) {
                        console.log();
                      } else {
                        this.logindata = JSON.parse(localStorage.getItem('user'));
                      }
              }


  ngOnInit() {
    if (this.logindata  !== null ) {
      const id = this.logindata.id;
      this.getUserData(id);
     }
  }

  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.user = res;
      if (this.user.type === 'renter') {
          this.isUserTypeRenter = true;
      } else {
          this.isUserTypeRenter = false;
      }
    });
  }

  onLogoutClick() {
    this.apiService.logout();
    this.flashMessagesService.show('You are Logged Out', {cssClass: 'alert-info'});
    this.router.navigate(['/']);
  }

}
