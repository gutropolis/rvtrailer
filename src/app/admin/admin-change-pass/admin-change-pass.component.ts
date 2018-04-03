import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-change-pass',
  templateUrl: './admin-change-pass.component.html',
  styleUrls: ['./admin-change-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminChangePassComponent implements OnInit {

rForm: FormGroup;
  users: any = [];

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute) {
      this.rForm = fb.group({
      'password' : [null, Validators.required],
      'validate' : ''
    });
  }

  ngOnInit() {

    this.apiService.viewPassword().subscribe(changePass => {
      this.users = changePass.user;
      // this.id = changePass.user._id;
      console.log(this.users);
    });

  }

  changePassword(id){
    this.apiService.changePassword(id, this.users).then(result => {
      let id = result['_id'];
      console.log(id);
      this.router.navigate(['admin/change-password']);
    }, (err) => {
      console.log(err);
    });
  }

}
