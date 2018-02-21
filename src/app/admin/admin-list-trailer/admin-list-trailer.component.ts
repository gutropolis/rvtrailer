import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rv-admin-list-trailer',
  templateUrl: './admin-list-trailer.component.html',
  styleUrls: ['./admin-list-trailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListTrailerComponent implements OnInit {

listtrailers: any = [];
p:number;
  constructor(public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {

    this.getListTrailerList();
  }

  getListTrailerList() {
    this.apiService.getListTrailer().then((res) => {
      this.listtrailers = res;
      console.log(this.listtrailers);
    }, (err) => {
      console.log(err);
    });
  }

  deleteListTrailer(id) {
  this.apiService.deleteListTrailer(id).then((result) => {
   // this.router.navigateByUrl('./admin-user.component.html');
    window.location.reload();
  }, (err) => {
    console.log(err);
  });
}



}
