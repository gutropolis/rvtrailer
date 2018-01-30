import {Router, ActivatedRoute, Params} from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'rvs-listing',
  templateUrl: './rvs-listing.component.html',
  styleUrls: ['./rvs-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RvsListingComponent implements OnInit {

  public rvList: any[] = [
    {
      rvimage: 'rv-1.jpg',
      rvName: 'Abella Airstream',
      rvPrice: '150/hour',
      location: 'nanaimo, Columbia',
      rating: 3,
      year: 2016,
      guest: 5,
      ownerName: 'Rezmi Bell',
      ownerImage: 'owner-1.png'
    }
  ];

  items: any[] = [];
  userDetails: any[] = [];
  logindata: any;
  rating: number;
  counter: number;
  item: any[] = [];
  listLimit = 10;

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute) {
                      if (this.logindata  === null ) {
                        console.log();
                      } else {
                        this.logindata = JSON.parse(localStorage.getItem('user'));
                      }
  }

  brandSlideVisible: boolean;

  ngOnInit() {
    this.brandSlideVisible = true;
    this.allItems();
    if (this.logindata  !== null ) {
        const id = this.logindata.id;
        this.getUserData(id);
     }

        this.activatedRoute.queryParams.subscribe((params: Params) => {
        let userId = params['location'];
        console.log(userId);
      });


  }

  filterSearch(params) {
    console.log("I am from filter search");
    console.log(params);
    this.getItems(params);
  }

  getItems(params) {
    this.apiService.filterSearch(params)
      .subscribe( (result) => {
        console.log(result);
        this.items = result;
        alert(this.items);
      });
  }

  allItems() {

    this.apiService.getAllListTrailer(this.listLimit)
          .subscribe( (result) => {
            this.items = result;
          });
  }

  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.userDetails = res;
    });
  }

  ratingClick() {
    console.log('kp');
  }

  loadMore() {
    this.listLimit = this.items.length + 5;
    console.log(this.listLimit);
    this.allItems();
  }

}
