import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'rv-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdminFeedbackComponent implements OnInit {
  feedbacks: any = [];
  p:number;
  constructor(public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) {
      this.getFeedback();
     }

  ngOnInit() {
  }
  getFeedback() {
    this.apiService.getAllFeedback().then((res) => {
      this.feedbacks = res;
     this.p=1;
      console.log(this.feedbacks);
    }, (err) => {
      console.log(err);
    });
  }
  deleteFeedback(id) {
    this.apiService.deleteFeedback(id).then((result) => {
      console.log(" delete successfully");
      this.getFeedback();
      console.log(id);
     // this.router.navigateByUrl('./admin-user.component.html');
     
    }, (err) => {
      console.log(err);
    });
  }

}
