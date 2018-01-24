import { Http } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent} from '../../shared/app/app.component';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-user-favourite',
  templateUrl: './user-favourite.component.html',
  styleUrls: ['./user-favourite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFavouriteComponent implements OnInit {

  public rvList: any[] = [];
  favourite_id: any[] = [];
  private userId: string;
  public lists: any;
  public toggleBool = true;

  constructor(public apiService: ApiService, private http: Http) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userId = user.id;
    }

    this.getFavIds()
      .then( data => {
        console.log(data);
        let ids = data;
        this.apiService.getTrailersByIds(ids).subscribe( (response) => {
          console.log(response);
          this.rvList = response;
        });
      });


  }


  getFavIds() {
    return new Promise((resolve, reject) => {
      let favIds: string[] = [];
      this.apiService.myFav(this.userId)
        .subscribe( response => {
          if (response.length === 0) {
            console.log("no fav list found");
          } else {
            response.map(function (favObj){
              favIds.push(favObj.trailer_id)
            });

            resolve(favIds);
          }
          console.log(response);
          this.favourite_id = response;
          console.log(this.favourite_id);

        });
    });
  }

  deleteListTrailer() {
    console.log('kirti');
    this.apiService.deleteAllmyFav(this.userId).subscribe((response) => {
      console.log('Delete All Fav by User id');
    });
  }

  changeEvent(event) {
      if (event.target.checked) {
          this.toggleBool = false;
      } else {
          this.toggleBool = true;
      }
  }
}
