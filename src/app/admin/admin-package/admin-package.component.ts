import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation,Pipe,PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderbyPipe } from '../../orderby.pipe';

@Component({
  selector: 'rv-admin-package',
  templateUrl: './admin-package.component.html',
  styleUrls: ['./admin-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPackageComponent implements OnInit {
packages:any=[];
p: number;
  constructor(public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute,) {
      this.getAllPackages();
     }

  ngOnInit() {
  }
  getAllPackages() {
    this.apiService.getPackages().subscribe((res) => {
    this.packages = res;
    console.log(this.packages);
    this.p=1;
    });
  }
  deletePackage(id) {
    this.apiService.deletePackage(id).then((result) => {
      console.log(" delete successfully");
      console.log(id);
     // this.router.navigateByUrl('./admin-user.component.html');
     // window.location.reload();
     this.getAllPackages();
    }, (err) => {
      console.log(err);
    });
  }

}
