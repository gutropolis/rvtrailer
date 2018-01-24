import { AppComponent } from './../../shared/app/app.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUserComponent implements OnInit {

  userDetails: any = [];
  logindata: any;

  constructor(private app: AppComponent,
              public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder
              ) {
                      if (this.logindata  === null ) {
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
      this.userDetails = res;
    });
  }

}
