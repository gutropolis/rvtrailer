import {Router, ActivatedRoute, Params, ActivatedRouteSnapshot} from '@angular/router';
import { ApiService } from './../../api.service';
import { Component, OnInit,Renderer, ViewEncapsulation } from '@angular/core';
import { ListTrailerComponent } from 'app/routes/list-trailer/list-trailer.component';
import { DatePipe } from '@angular/common';
import { count } from 'rxjs/operator/count';

@Component({
  selector: 'rvs-listing',
  templateUrl: './rvs-listing.component.html',
  styleUrls: ['./rvs-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RvsListingComponent implements OnInit {
  public loading = false;
  listtrailers:any=[];
  items: any = [];
  users: any[] = [];
  itemwithavgrating : any[]= [];
  userDetails: any[] = [];
  logindata: any;
  item: any[] = [];
  content:any[]=new Array();
  listLimit:number=10;
  listlmt:number=0;
  isReadonly: boolean = true;

  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              public router: Router,private datePipe: DatePipe,private renderer: Renderer) {
                this.renderer.setElementProperty(document.body, "scrollTop", 0);
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
      let from=params['dateFrom'];
      let to=params['dateTo'];
      console.log('myrecord after click home search');
      console.log(from);
      console.log(to);
      console.log(userId);
      console.log(params);
     if(typeof from  !== 'undefined')
     {
      this.getItems(params);
     }
    
    });


  }

  filterSearch(params) {
    console.log("I am from filter search");
    console.log(params);
    this.getItems(params);
  }

  getItems(params) {
    this.loading = true;
    this.apiService.filterSearch(params)
      .subscribe( (result) => {
        this.loading = false;
        console.log(result);
        this.items = result;
      });
  }

  allItems() {
    this.loading = true;
    this.apiService.getAllListTrailer(this.listLimit)
          .subscribe( (result) => {
            this.loading = false;
            result.forEach(snapshot => {
            var  startRatingArray = snapshot.star_rating;
            var icount=0;
            var totalR=0;
            var avgRate=0;
            startRatingArray.forEach(rate => {
                icount=icount+1;
               totalR=totalR+rate.star_rating;
            });
            if(icount > 0 && totalR > 0){
                avgRate=totalR/icount;
            }
            console.log('count is '+icount);
            console.log('avg is '+avgRate);
            console.log('total  is '+totalR);
              console.log('starratomg'+startRatingArray);                         
              Object.assign(snapshot, {'avgrating':avgRate});         
            });
            this.items = result;
            console.log('aaa'); 
         
            this.listlmt=this.listLimit;
            let lenght=this.items.length;
            console.log('this is items lenght'+lenght);
            console.log('this is list limit'+this.listlmt);
          });

          this.apiService.getAllUsers().subscribe((res) => {
            this.users = res;
            console.log(this.users);
          });

  }
  loadMore() {
    console.log('check item length'+this.items.length);
    
    this.listLimit = this.items.length + 5;
    console.log(this.listLimit);
    
    this.allItems();
   


   /* console.log(this.counter + 'dat size'+this.items.length)
    for(let i=this.counter+1;i<this.items.length;i++)
    {
    this.content.push(this.items[i]);
    if(i%3==0) break;
    }
    this.counter+=3;
    
    */
  }

  getUserData(id) {
    this.apiService.showUser(id).subscribe((res) => {
      this.userDetails = res;
      console.log(this.userDetails);
    });
  }

  rentit(id)
  {
   console.log('renter click with this id '+id);
   //this.router.navigate(['/rv/'+id]);

   this.apiService.showListTrailer(id).subscribe((res) => {
            
    this.listtrailers =res;
    //console.log('My date Format '+this.datePipe.transform(this.listtrailers.unavailability_from,"yyyy-MM-dd"));
   // console.log('date check by : '+getMonth(this.listtrailers.unavailability_from));
    let startdate=this.datePipe.transform(this.listtrailers.unavailability_from,"yyyy-MM-dd");
    let enddate=this.datePipe.transform(this.listtrailers.unavailability_to,"yyyy-MM-dd");
    console.log('Date format after using pipe'+startdate);
    console.log('Date format after using pipe'+startdate);
    this.router.navigate(['/rv/'+id], { queryParams: 
      {
        
        from:startdate,
        to:enddate,
        
      }
     
      });
     
          });
         

  }
}

