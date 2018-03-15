import { Component, OnInit, ViewEncapsulation,EventEmitter } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
@Component({
  selector: 'rv-signup-owner',
  templateUrl: './signup-owner.component.html',
  styleUrls: ['./signup-owner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupOwnerComponent implements OnInit {
  public loading = false;
  users: Observable<firebase.User>;
   myFilter = new EventEmitter() ;
rForm: FormGroup;
user: {};
photo: any;

  constructor(public af: AngularFireAuth,
    private fb: FormBuilder,
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
    this.loading = true;
    let photoname = 'userphoto.png';
    this.photo = {'photo': photoname};
    const signup_data = Object.assign({}, this.rForm.value, this.photo);
    this.apiService.addUser(signup_data).then((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
     // alert('Please Loggin With Your Email and Password');
//for mailing perpose
    // this.Email(this.rForm.value);
    // console.log('Email is where'+this.Email(this.rForm.value));
      this.router.navigate(['/login']);
      this.loading = false;
    }, (err) => {
      this.loading = false;
      console.log(err);
      this.flashMessagesService.show('This E-mail Id is Registered.', {cssClass: 'alert-danger'});
    });
  }

  Email(rForm) {
    this.loading = false;
    let emailparams: any = {
      location: rForm.value.email,
     
    }
    console.log(emailparams);
     // alert("hello");
    this.myFilter.emit(emailparams);
  
  }
  
  facebookLogin() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=>

      //console.log(res)
      this.router.navigate(['/login'])
      
    );
  }

googleLogin() {
this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
.then(res => 
  
  //console.log(res)
  this.router.navigate(['/login'])

);
}
  

}
