import { Http } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router,Params,ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
@Component({
  selector: 'rv-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class UserFeedbackComponent implements OnInit {
  rForm: FormGroup;
  userid:any=[];
  trailer_id:any=[];
 
  constructor(public af: AngularFireAuth,
    private fb: FormBuilder,
              public router:Router,
              public apiService:ApiService,
              private flashMessagesService: FlashMessagesService,
              private route: ActivatedRoute) { 
                this.rForm = fb.group({
                  'title' : [null, Validators.required],
                  'review' : [null, Validators.required],
                  'star_rating' : [null, Validators.required]
                });
              }

  ngOnInit() {
    this.trailer_id=this.route.snapshot.params['id'];
    console.log(this.trailer_id);
  }
  

  onSubmit()
  {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.userid= {'user_id': user.id};
    let trailerid={'trailer_id': this.trailer_id};
    console.log('trailer id '+trailerid);
    console.log(this.rForm.value);
    const feedbackdata = Object.assign({}, this.rForm.value,this.userid,trailerid);
    this.apiService.addFeedback(feedbackdata).then((result) => {
      console.log('Data Save Successfully');
     
      
    });
    this.router.navigate(['/user-dashboard/message']);
  }
  

}
