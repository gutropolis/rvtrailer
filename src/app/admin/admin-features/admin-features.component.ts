import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rv-admin-features',
  templateUrl: './admin-features.component.html',
  styleUrls: ['./admin-features.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminFeaturesComponent implements OnInit {
  features: any = [];
  constructor(public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) {

      this.getFeature();
     }

  ngOnInit() {
  }
  getFeature() {
    this.apiService.getAllFeature().then((res) => {
      this.features = res;
      console.log(this.features);
      }, (err) => {
      console.log(err);
    });
  }
  deleteFeature(id) {
    this.apiService.deleteFeature(id).then((result) => {
      console.log(" delete successfully");
      console.log(id);
     // this.router.navigateByUrl('./admin-user.component.html');
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
