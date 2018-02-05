import { ApiService } from './../../api.service';
import { Component, OnInit, Input, Output,  AfterViewInit, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'rv-add-rental-type',
  templateUrl: './add-rental-type.component.html',
  styleUrls: ['./add-rental-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRentalTypeComponent implements OnInit {
  rForm: FormGroup;
  rental: any = [];

  constructor(private fb: FormBuilder,
    public router:Router,
    public apiService:ApiService) 
    {
      this.getRental();
      this.rForm = fb.group({
        'parent_id': [ null,Validators.required],
        'title' : [null, Validators.required],
        'sort_description' : [null, Validators.required],
        'icon':[null],
        'active' : [ false ],
        
        
      });
    

     }
     categoryform(form) {
      let categoryParams: any = {
        parent_id: form.value.parent_id,
        title: form.value.title,
        sort_description:form.value.sort_description,
        icon: form.value.icon,
       
        };
        categoryParams.parent_id = form.value.parent_id;
        categoryParams.title = form.value.parent_title;
        categoryParams.icon = form.value.icon;
     
      console.log(categoryParams);
     
     
  
    }
    getRental() {
      this.apiService.getAllRental().then((res) => {
        this.rental = res;
        console.log(this.rental);
        }, (err) => {
        console.log(err);
      });
    }
          

  ngOnInit() {

  }
  onSubmit() {
    this.apiService.addRental(this.rForm.value).then((result) => {
      console.log(this.rForm.value);
     // let id = result['_id'];
    this.router.navigate(['admin/view_rental-type']);
    console.log("data save successfully");
    },(err) => {
     console.log(err);
    });
  }

}
