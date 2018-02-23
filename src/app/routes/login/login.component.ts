import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../api.service';

// Do not import from 'firebase' as you'd lose the tree shaking benefits

import * as firebase from 'firebase/app';

@Component({
  selector: 'rv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  email: string;
  loggedInUser:any;

  constructor(public af: AngularFireAuth,
              public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder) {
                this.createForm();

              }

  facebookLogin() {
        this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
      }

  googleLogin() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => console.log(res));
  }

  createForm() {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.form = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.pattern(emailRegex)]],
      'password' : [null, Validators.required],
      'validate' : ''
    });
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;

  }

    onLoginSubmit() {
    console.log(this.form.value);
      this.email = this.form.get('email').value;
      this.processing = true;
      this.disableForm();
      const user = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      };

      console.log(user);

    this.apiService.clientLogin(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Username or Password are Not Found.If sign up complete then call to admin for aproved your a/c';
        this.processing = false;
        this.enableForm();
      } else {
       // this.getUserByEmail();
        this.messageClass = 'alert alert-success';
        this.message = 'Success';
        console.log(data.token);
        this.apiService.storeUserData(data.token, data.user);
        setTimeout(() => {
          console.log('Role Type is '+data.user.role);
           if(data.user.role){
             if(data.user.role=='admin'){
              this.router.navigate(['/admin']);
            }else   if(data.user.role=='owner'){
              this.router.navigate(['/']);
             }else{
              this.router.navigate(['/']);
             }
           }
            
           }, 2000);
      }
    });

}

// getUserByEmail() {
//   this.apiService.userByEmail(this.email)
//     .subscribe( data => {
//       console.log('brijesh');
//       console.log(data);
//       localStorage.setItem('loggedInUser', data);
//       this.loggedInUser = data;
//     });
// }

}
