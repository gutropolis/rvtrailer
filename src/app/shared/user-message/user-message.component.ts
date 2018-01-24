import { Http } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMessageComponent implements OnInit {

  messageDetails: any = [];

  constructor(public apiService: ApiService,
              private http: Http ) { }

  ngOnInit() {
   this.getMessageById();
  }

getMessageById() {
    let user = JSON.parse(localStorage.getItem('user'));
    let ids = user.id;
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
