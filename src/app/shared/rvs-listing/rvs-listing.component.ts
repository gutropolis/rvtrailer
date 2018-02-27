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
  users: any[] = [];
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
        let from=params['from'];
        let to=params['to'];
        console.log('myrecord after click home search');
        console.log(from);
        console.log(to);
        console.log(userId);
        console.log(params);
        this.getItems(params);
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
       // alert(JSON.stringify(this.items));
      });
  }

  allItems() {

    this.apiService.getAllListTrailer(this.listLimit)
          .subscribe( (result) => {
            this.items = result;
            console.log(this.item);
          });

          this.apiService.getAllUsers().subscribe((res) => {
            this.users = res;
            console.log(this.users);
          });

  }


  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.userDetails = res;
      console.log(this.userDetails);
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
