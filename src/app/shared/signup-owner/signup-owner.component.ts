import { Component, OnInit, ViewEncapsulation,EventEmitter } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'rv-signup-owner',
  templateUrl: './signup-owner.component.html',
  styleUrls: ['./signup-owner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupOwnerComponent implements OnInit {
   myFilter = new EventEmitter() ;
rForm: FormGroup;
user: {};
photo: any;

  constructor(private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService,
              private flashMessagesService: FlashMessagesService) {

              // let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
                let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.rForm = fb.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.pattern(emailRegex)]],
      'password' : [null, Validators.required],
      'owner' : [ true ],
      'approved' : [ false ],
      'validate' : '',
      'type': 'owner',
      'photo': [null],
      'about_user_description': [null],
      'user_address': [null],
      'user_contact_no': [null],
      'created_at':Date.now(),
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    let photoname = 'userphoto.png';
    this.photo = {'photo': photoname};
    const signup_data = Object.assign({}, this.rForm.value, this.photo);
    this.apiService.addUser(signup_data).then((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
     // alert('Please Loggin With Your Email and Password');
//for mailing perpose
     this.Email(this.rForm.value);
     console.log('Email is where'+this.Email(this.rForm.value));
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
      this.flashMessagesService.show('This E-mail Id is Registered.', {cssClass: 'alert-danger'});
    });
  }

  Email(rForm) {
    let emailparams: any = {
      location: rForm.value.email,
     
    }
    console.log(emailparams);
     // alert("hello");
    this.myFilter.emit(emailparams);
  
  }
  

}
