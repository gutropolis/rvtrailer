import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHeaderComponent implements OnInit {

  constructor(public router:Router,
    public apiService:ApiService,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService
   ) { }

onLogoutClick() {
  //this.auth.logout();
this.apiService.logout();
//this.flashMessagesService.show('You are Logged Out', {cssClass: 'alert-info'});
//this.router.navigate(['admin/']);
this.router.navigate(['/login']);
}

  ngOnInit() {
  }

}
