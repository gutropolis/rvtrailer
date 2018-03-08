import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  logindata: any = [];
  user: any = [];
  userdetails: any = [];

   constructor(public router: Router,
              public apiService: ApiService,
              private formBuilder: FormBuilder,
              private flashMessagesService: FlashMessagesService)
              {

                if(this.logindata  === null ) {
                  console.log()
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
    });
  }

  onMyAccount() {
      this.router.navigate(['/user-dashboard']);
  }




onLogoutClick() {
  this.apiService.logout();
  this.flashMessagesService.show('You are Logged Out', {cssClass: 'alert-info'});
  this.router.navigate(['/']);
}
}




