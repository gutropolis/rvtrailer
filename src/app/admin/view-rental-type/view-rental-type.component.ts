import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rv-view-rental-type',
  templateUrl: './view-rental-type.component.html',
  styleUrls: ['./view-rental-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewRentalTypeComponent implements OnInit {
  rental: any = [];
  
  p:number;
  constructor(public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { 

      this.getRental();
    }

  ngOnInit() {
  }
  getRental() {
    this.apiService.getAllRental().then((res) => {
      this.rental = res;
      this.p=1;
      }, (err) => {
      console.log(err);
    });
  }
  deleteRental(id) {
    this.apiService.deleteRental(id).then((result) => {
      console.log("Enter delete successfully");
      console.log(id);
     // this.router.navigateByUrl('./admin-user.component.html');
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
  

}
