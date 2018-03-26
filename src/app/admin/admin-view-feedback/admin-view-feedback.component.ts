import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.scss']
})
export class AdminViewFeedbackComponent implements OnInit {
  feedback:any=[];
  isReadonly: boolean = true;
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFeedback(this.route.snapshot.params['id']);
  }
  getFeedback(id) {
    this.apiService.viewFeedback(id).then((res) => {
      this.feedback = res;
      console.log(this.feedback);
    }, (err) => {
      console.log(err);
    });
  }

}
