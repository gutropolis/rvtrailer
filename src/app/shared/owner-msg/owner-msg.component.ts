import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { Http } from '@angular/http';
@Component({
  selector: 'rv-owner-msg',
  templateUrl: './owner-msg.component.html',
  styleUrls: ['./owner-msg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerMsgComponent implements OnInit {
  messageDetails: any = [];
  constructor(public apiService: ApiService,
    private http: Http) { }

  ngOnInit() {
    this.getMessageById();
  }
  getMessageById() {
    let user = JSON.parse(localStorage.getItem('user'));
    let ids = user.id;
    let user_name=user.username;
    console.log('username is :'+user_name);
    console.log('this i my id user details'+JSON.stringify(user));
    console.log(ids);
      this.apiService.messagesByUserId(ids).subscribe( (response) => {
       this.messageDetails = response;
       console.log(this.messageDetails);
      });
  }
  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

}
