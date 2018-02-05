import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';


@Component({
  selector: 'rv-show-rental-type',
  templateUrl: './show-rental-type.component.html',
  styleUrls: ['./show-rental-type.component.scss']
})
export class ShowRentalTypeComponent implements OnInit {
 rental:any=[];
  constructor(private fb: FormBuilder,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRental(this.route.snapshot.params['id']);
  }
  getRental(id) {
    this.apiService.showRental(id).then((res) => {
      this.rental = res;
      console.log(this.rental);
    }, (err) => {
      console.log(err);
    });
  }

}
