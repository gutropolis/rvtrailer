import { ApiService } from '../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'rv-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

messageClass;
message;
processing = false;
form: FormGroup;

  constructor(public router:Router,
              public apiService:ApiService,
              private formBuilder: FormBuilder
            ) {
                  this.createForm();
              }

  createForm() {
      this.form = this.formBuilder.group({
      'email' : [null, Validators.required],
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

  ngOnInit() {
  }

  // onLoginSubmit() {
  //   console.log(this.form.value);

  // //  this.apiService.login(this.form.value);

  //   let email = this.form.value.email;
  //   let password = this.form.value.password;

  //   if (email === 'brijesh@coderadobe.com'  && password === '123456' ) {
  //     console.log('login successful');
  //     this.router.navigate(['admin/user']);
  //    } else {
  //     // console.log('Please enter valid details');
  //     alert('Please enter valid details');
  //     window.location.reload();

  //      }
  //   }

    onLoginSubmit() {
    console.log(this.form.value);

      this.processing = true;
      this.disableForm();
      const user = {
        email: this.form.get('email').value,
        password: this.form.get('password').value
      }


    this.apiService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Username or Password are Not Found.';
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = 'Success';
        this.apiService.storeUserData(data.token, data.user);
        setTimeout(() => {
            this.router.navigate(['admin/dashboard']);
           }, 2000);
      }
    });

    }

}
