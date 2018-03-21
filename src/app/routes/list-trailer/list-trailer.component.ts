import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit,Renderer,ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-list-trailer',
  templateUrl: './list-trailer.component.html',
  styleUrls: ['./list-trailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListTrailerComponent implements OnInit {

  user: any = [];
  logindata: any = [];

  constructor(private app: AppComponent,
              private apiService: ApiService,
              public router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,private renderer: Renderer)
              {
                this.renderer.setElementProperty(document.body, "scrollTop", 0);
                this.app.brandSlideVisible = false;
                    this.app.brandSlideVisible = false;
                      if(this.logindata  === null ) {
                        console.log();
                      } else {
                        this.logindata = JSON.parse(localStorage.getItem('user'));
                      }

              }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.app.brandSlideVisible = false;
    this.brandSlideVisible = true;

    if (this.logindata  !== null ) {
    const id = this.logindata.id;

    console.log(id);
     this.getUserData(id);
    } else {
      this.router.navigate(['signup/renter']);
    }
  }

  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.user = res;
           console.log(this.user);
      if (this.user.package_id === null) {
          this.router.navigate(['subscribe-plan']);
      } else {
          this.router.navigate(['list-trailer']);
      }
    });
  }

}
