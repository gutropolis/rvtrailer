import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-edit-features',
  templateUrl: './admin-edit-features.component.html',
  styleUrls: ['./admin-edit-features.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditFeaturesComponent implements OnInit {
  rForm: FormGroup;
  feature: any = [];
 
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) 
    {
      this.rForm = fb.group({
        'feature_name': [null, Validators.required],
       
       
       
    });
    

     }

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
  updateFeature(id) {
    this.apiService.updateFeature(id, this.feature).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/features']);
    }, (err) => {
      console.log(err);
    });
  }

}
