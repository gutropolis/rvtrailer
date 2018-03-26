import { ApiService } from './../../api.service';
import { Component, OnInit, Input, Output,  AfterViewInit, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'rv-admin-add-feedback',
  templateUrl: './admin-add-feedback.component.html',
  styleUrls: ['./admin-add-feedback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAddFeedbackComponent implements OnInit {
  rForm: FormGroup;
  userid:any=[];
  constructor(private fb: FormBuilder,
    public router:Router,
    public apiService:ApiService) { 
      this.rForm = fb.group({
        'title': [ null,Validators.required],
        'review':[ null,Validators.required],
        'star_rating':[ null,Validators.required]
       
        
      });
    }

  ngOnInit() {
  }
  onSubmit() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.userid= {'user_id': user.id};
    const feedbackdata = Object.assign({}, this.rForm.value,this.userid);
    this.apiService.addFeedback(feedbackdata).then((result) => {
      console.log(this.rForm.value);
     
    this.router.navigate(['admin/feedback']);
    console.log("data save successfully");
    },(err) => {
     console.log(err);
    });
  }

}
