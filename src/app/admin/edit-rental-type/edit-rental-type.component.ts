import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-edit-rental-type',
  templateUrl: './edit-rental-type.component.html',
  styleUrls: ['./edit-rental-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditRentalTypeComponent implements OnInit {
  rForm: FormGroup;
  rental: any = [];

  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { 

      this.rForm = fb.group({
        'title' : [null, Validators.required],
        'sort_description' : [null, Validators.required],
        'icon' : [null],
       
        'active' : [ false ],
        'validate' : ''
       
       
    });
  }

  ngOnInit() {
    this.getRental(this.route.snapshot.params['id']);
  }
  getRental(id) {
    this.apiService.getEditRental(id).then((res) => {
      this.rental = res;
      console.log(this.rental);
    }, (err) => {
      console.log(err);
    });
  }
  updateRental(id) {
    this.apiService.updateRental(id, this.rental).then((result) => {
      let id = result['_id'];
      this.router.navigate(['admin/view_rental-type']);
    }, (err) => {
      console.log(err);
    });
  }

}
