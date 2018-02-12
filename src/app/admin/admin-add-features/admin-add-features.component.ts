import { ApiService } from './../../api.service';
import { Component, OnInit, Input, Output,  AfterViewInit, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'rv-admin-add-features',
  templateUrl: './admin-add-features.component.html',
  styleUrls: ['./admin-add-features.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddFeaturesComponent implements OnInit {
  rForm: FormGroup;
  constructor(private fb: FormBuilder,
    public router:Router,
    public apiService:ApiService)
     { 
      this.rForm = fb.group({
        'feature_name': [ null,Validators.required]
       
        
      });


     }

  ngOnInit() {
  }

  onSubmit() {
    this.apiService.addFeature(this.rForm.value).then((result) => {
      console.log(this.rForm.value);
     
    this.router.navigate(['admin/features']);
    console.log("data save successfully");
    },(err) => {
     console.log(err);
    });
  }

}
