import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';


@Component({
  selector: 'rv-admin-view-package',
  templateUrl: './admin-view-package.component.html',
  styleUrls: ['./admin-view-package.component.scss']
})
export class AdminViewPackageComponent implements OnInit {
  Package:any=[];
  constructor( public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPackage(this.route.snapshot.params['id']);
  }

  getPackage(id) {
    this.apiService.getViewPackage(id).then((res) => {
      this.Package = res;
      console.log(this.Package);
    }, (err) => {
      console.log(err);
    });
  }

}
