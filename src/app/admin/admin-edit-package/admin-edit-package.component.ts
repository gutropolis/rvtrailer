import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-admin-edit-package',
  templateUrl: './admin-edit-package.component.html',
  styleUrls: ['./admin-edit-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditPackageComponent implements OnInit {
  rForm: FormGroup;
  package:any=[];
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) {
      this.rForm = fb.group({
        'name': [null, Validators.required],
        'price': [null, Validators.required],
        'listing': [null, Validators.required],
        'edit_listing': [null, Validators.required],
       

       
              
    });
     }

  ngOnInit() {
    this.getPackages(this.route.snapshot.params['id']);
  }
  getPackages(id) {
    this.apiService.getViewPackage(id).then((res) => {
      this.package = res;
      console.log(this.package);
    }, (err) => {
      console.log(err);
    });
  }
  updateFeature(id) {
    this.apiService.updatePackage(id, this.package).then((result) => {
      console.log(this.package);
      let id = result['_id'];
      this.router.navigate(['admin/package']);
    }, (err) => {
      console.log(err);
    });
  }

}
