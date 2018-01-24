import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'rv-owner-ads',
  templateUrl: './owner-ads.component.html',
  styleUrls: ['./owner-ads.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerAdsComponent implements OnInit {

  userDetails: any = [];
  logindata: any;

  constructor(public router: Router,
              public apiService: ApiService,
              private activatedRoute: ActivatedRoute
              ) {
                  if(this.logindata  === null ) {
                    console.log();
                  } else {
                    this.logindata = JSON.parse(localStorage.getItem('user'));
                  }
              }

  ngOnInit() {
    if (this.logindata  !== null ) {
      const id = this.logindata.id;
      this.getUserListDetail(id);
    }
  }

  getUserListDetail(id) {
    this.apiService.ListByUserId(id).subscribe((res) => {
      this.userDetails = res;
    });
  }

  deleteListTrailer(id) {
  this.apiService.deleteListTrailer(id).then((result) => {
    window.location.reload();
  }, (err) => {
    console.log(err);
  });
}


}
