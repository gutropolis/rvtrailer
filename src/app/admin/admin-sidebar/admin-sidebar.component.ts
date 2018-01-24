import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'rv-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit {

  constructor(public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder,
              private flashMessagesService: FlashMessagesService
             ) { }

  onLogoutClick() {
    this.apiService.logout();
    this.flashMessagesService.show('You are Logged Out', {cssClass: 'alert-info'});
    this.router.navigate(['/admin-login']);
 //   this.router.navigateByUrl('./admin-login.component.html');
  }

  ngOnInit() {
  }

}
