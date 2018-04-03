import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit,Renderer,ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-subscribe-plan',
  templateUrl: './subscribe-plan.component.html',
  styleUrls: ['./subscribe-plan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubscribePlanComponent implements OnInit {

  packages: any[] = [];
  user: any = [];
  userDetails:any=[];
  public isPackageSubscribe = false;

  constructor(private app: AppComponent,
              private apiService: ApiService,
              public router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private renderer: Renderer)
              {
                this.app.brandSlideVisible = false;
                     this.app.brandSlideVisible = false;
                     this.renderer.setElementProperty(document.body, "scrollTop", 0);
              }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
    this.getPackagePlanDetails();
  }

  getPackagePlanDetails() {
    this.apiService.getPackages().subscribe((res) => {
      this.packages = res;
    });
  }

  onSubmitPackage(id) {
    let package_id = {'package_id': id};
    this.user = JSON.parse(localStorage.getItem('user'));
    let userId = this.user.id;
  
    let usermail=this.user.email;
    let firstname=this.user.firstname;
    let lastname=this.user.lastname;

    this.apiService.updateUser(userId, package_id).then((result) => {
      let id = result['_id'];
      this.router.navigate(['list-trailer']);
  });

  this.apiService.showUser(this.user.id).subscribe((res) => {

    this.userDetails = res;
    const subscriptData = Object.assign({},{email: this.userDetails.email} ,{firstname:this.userDetails.firstname},{lastname:this.userDetails.lastname},{packages_id:package_id});
    console.log(subscriptData);
  this.apiService.PackagePlanbyEmail(subscriptData).subscribe((result) => {
    //console.log(this.rForm.value);
    console.log('send email also');
    console.log(this.packages);
   
     });

  });

  


}

}
