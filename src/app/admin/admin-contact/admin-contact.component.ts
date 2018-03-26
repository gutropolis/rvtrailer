import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'rv-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdminContactComponent implements OnInit {
  contactus: any = [];
  p:number;
  constructor(public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute) { 
      this.getContactus();
    }

  ngOnInit() {
  }
  getContactus() {
    this.apiService.getContactus().then((res) => {
      this.contactus = res;
     this.p=1;
      console.log(this.contactus);
    }, (err) => {
      console.log(err);
    });
  }

  deleteContactus(id)
  {
    
  }

}
