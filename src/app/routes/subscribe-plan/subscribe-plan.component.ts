import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-subscribe-plan',
  templateUrl: './subscribe-plan.component.html',
  styleUrls: ['./subscribe-plan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscribePlanComponent implements OnInit {

  packages: any[] = [];
  user: any = [];
  public isPackageSubscribe = false;

  constructor(private app: AppComponent,
              private apiService: ApiService,
              public router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute)
              {
                this.app.brandSlideVisible = false;
                     this.app.brandSlideVisible = false;
              }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
    this.getPackagePlanDetails();
  }

  getPackagePlanDetails() {
    this.apiService.getPackages().subscribe((res) => {
      this.packages = res;
    });
  }

  onSubmitPackage(id) {
    let package_id = {'package_id': id};
    this.user = JSON.parse(localStorage.getItem('user'));
    let userId = this.user.id;

    this.apiService.updateUser(userId, package_id).then((result) => {
      let id = result['_id'];
      this.router.navigate(['list-trailer']);
  });


}

}
