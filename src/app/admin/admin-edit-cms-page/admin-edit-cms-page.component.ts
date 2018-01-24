import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-edit-cms-page',
  templateUrl: './admin-edit-cms-page.component.html',
  styleUrls: ['./admin-edit-cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditCmsPageComponent implements OnInit {

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

      this.getCmspages(this.route.snapshot.params['id']);
  }

  getCmspages(id) {
    this.apiService.showCmsPage(id).then((res) => {
      this.cmspages = res;
      console.log(this.cmspages);
    }, (err) => {
      console.log(err);
    });
  }

  updateCmsPage(id) {
    this.apiService.updateCmsPage(id, this.cmspages).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/cmspage']);
    }, (err) => {
      console.log(err);
    });
  }


}
