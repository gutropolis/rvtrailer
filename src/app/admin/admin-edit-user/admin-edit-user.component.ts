import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditUserComponent implements OnInit {

 rForm: FormGroup;
  users: any = [];

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute) {

      this.rForm = fb.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'type': [null, Validators.required],
      'approved' : [ false ],
      'validate' : ''
    });

  }

  ngOnInit() {

      this.getUsers(this.route.snapshot.params['id']);
  }

  getUsers(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.users = res;
      console.log(this.users);
    }, (err) => {
      console.log(err);
    });
  }

  updateUser(id) {
    this.apiService.updateUser(id, this.users).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/user']);
    }, (err) => {
      console.log(err);
    });
  }


}
