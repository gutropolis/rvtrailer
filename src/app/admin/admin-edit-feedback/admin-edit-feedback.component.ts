import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-edit-feedback',
  templateUrl: './admin-edit-feedback.component.html',
  styleUrls: ['./admin-edit-feedback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditFeedbackComponent implements OnInit {
  rForm: FormGroup;
  feedback: any = [];
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) {
      this.rForm = fb.group({
        'title': [null, Validators.required],
        'review': [null, Validators.required],
        'star_rating': [null, Validators.required],

       
              
    });
     }

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
  updateFeedback(id) {
    this.apiService.updateFeedback(id, this.feedback).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/feedback']);
    }, (err) => {
      console.log(err);
    });
  }

}
