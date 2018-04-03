import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddUserComponent implements OnInit {

rForm: FormGroup;
  user: {};

  constructor(private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService) {

      this.rForm = fb.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
        'type':[null, Validators.required],
     // 'approved' : [ false ],
      'created_at':Date.now(),
      'validate' : ''
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.apiService.addUser(this.rForm.value).then((result) => {
     // console.log(this.rForm.value);
      let id = result['_id'];
     
        this.apiService.Email(this.rForm.value).subscribe((result) => {
          console.log(this.rForm.value);
          console.log('send email also');
         
           });
      this.router.navigate(['admin/user']);
    }, (err) => {
      console.log(err);
    });
  }

}
