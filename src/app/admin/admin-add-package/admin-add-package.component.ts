import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'rv-admin-add-package',
  templateUrl: './admin-add-package.component.html',
  styleUrls: ['./admin-add-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddPackageComponent implements OnInit {
  rForm: FormGroup;
  constructor(private fb: FormBuilder,
  public router:Router,
  public apiService:ApiService) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'price' : [null, Validators.required],
      'listing' : [null, Validators.required],
      'edit_listing' : [null, Validators.required],
      'created_at':Date.now(),
      'validate' : ''
    });

   }

  ngOnInit() {
  }
  onSubmit() {
    this.apiService.addPackage(this.rForm.value).then((result) => {
      console.log(this.rForm.value);
     
    this.router.navigate(['admin/package']);
    console.log("data save successfully");
    }, (err) => {
      console.log(err);
    });
  }

}
