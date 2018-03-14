import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
@Component({
  selector: 'rv-signup-renter',
  templateUrl: './signup-renter.component.html',
  styleUrls: ['./signup-renter.component.scss']
})
export class SignupRenterComponent implements OnInit {
  users: Observable<firebase.User>;
  rForm: FormGroup;
  user: {};
  messageClass;
  message;
  photo: any;

  constructor(public af: AngularFireAuth,
              private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService,
              private flashMessagesService: FlashMessagesService) {

              let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      this.rForm = this.fb.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.pattern(emailRegex)]],
      'password' : [null, Validators.required],
      'renter' : [ true ],
      'approved' : [ false ],
      'validate' : '',
      'type': 'renter',
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
      //alert('Please Loggin With Your Email and Password');
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
        this.flashMessagesService.show('This E-mail Id is Registered.', {cssClass: 'alert-danger'});
    });
  }
  facebookLogin() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => console.log(res));
  }

googleLogin() {
this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
.then(res => console.log(res));
}
  

}
