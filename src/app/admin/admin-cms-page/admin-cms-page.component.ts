import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rv-admin-cms-page',
  templateUrl: './admin-cms-page.component.html',
  styleUrls: ['./admin-cms-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCmsPageComponent implements OnInit {

cmspages: any = [];
listLimit=10;
  constructor(public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {

    this.getCmsPages();
  }

  getCmsPages() {
    this.apiService.getLimitCmsPages(this.listLimit).subscribe((res) => {
      this.cmspages = res;
      }, (err) => {
      console.log(err);
    });
  }

  deletePage(id) {
  this.apiService.deleteCmsPage(id).then((result) => {
   // this.router.navigateByUrl('./admin-user.component.html');
    window.location.reload();
  }, (err) => {
    console.log(err);
  });
}
loadMore() {
  this.listLimit = this.cmspages.length + 5;
  console.log(this.listLimit);
  this.getCmsPages();
}

}
