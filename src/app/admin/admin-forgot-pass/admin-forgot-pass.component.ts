import { ApiService } from '../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-admin-forgot-pass',
  templateUrl: './admin-forgot-pass.component.html',
  styleUrls: ['./admin-forgot-pass.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class AdminForgotPassComponent implements OnInit {

messageClass;
message;
processing = false;
form: FormGroup;

 constructor(public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder,
              private flashMessagesService: FlashMessagesService
            ) {
                  this.createForm();
              }

  createForm() {
      this.form = this.formBuilder.group({
      'email' : [null, Validators.required],
      'validate' : ''
    });
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    console.log(this.form.value);
    this.flashMessagesService.show('Your Password is Send in your E-mail', {cssClass: 'alert-info'});
    alert('Your Password is Send in your E-mail');
    this.router.navigate(['admin/']);

  }

}
