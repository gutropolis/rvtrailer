import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-view-cms-page',
  templateUrl: './admin-view-cms-page.component.html',
  styleUrls: ['./admin-view-cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminViewCmsPageComponent implements OnInit {

  rForm: FormGroup;
  cmspages: any = [];

  constructor(private fb: FormBuilder,
              public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute) {

      this.rForm = fb.group({
      'slug' : [null, Validators.required],
      'body' : [null, Validators.required],
    });
  }

  ngOnInit() {

      this.getCmsPages(this.route.snapshot.params['id']);
  }

  getCmsPages(id) {
    this.apiService.showCmsPage(id).then((res) => {
      this.cmspages = res;
      console.log(this.cmspages);
    }, (err) => {
      console.log(err);
    });
  }

}
