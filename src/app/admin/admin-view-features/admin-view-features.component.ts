import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';
@Component({
  selector: 'rv-admin-view-features',
  templateUrl: './admin-view-features.component.html',
  styleUrls: ['./admin-view-features.component.scss']
})
export class AdminViewFeaturesComponent implements OnInit {
  feature:any=[];
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getFeature(this.route.snapshot.params['id']);
  }
  getFeature(id) {
    this.apiService.viewFeature(id).then((res) => {
      this.feature = res;
      console.log(this.feature);
    }, (err) => {
      console.log(err);
    });
  }


}
