import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'rv-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUserComponent implements OnInit {

users: any = [];
listLimit=10;
  constructor(public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {

    this.getUserList();
  }

  getUserList() {
    this.apiService.getLimitUser(this.listLimit).subscribe((res) => {
      this.users = res;
    }, (err) => {
      console.log(err);
    });
  }

  deleteUser(id) {
  this.apiService.deleteUser(id).then((result) => {
   // this.router.navigateByUrl('./admin-user.component.html');
    window.location.reload();
  }, (err) => {
    console.log(err);
  });
}
loadMore() {
  this.listLimit = this.users.length + 5;
  console.log(this.listLimit);
  this.getUserList();
}

}
