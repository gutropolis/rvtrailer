import { ApiService } from './../../api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rv-user-detail-message',
  templateUrl: './user-detail-message.component.html',
  styleUrls: ['./user-detail-message.component.scss']
})
export class UserDetailMessageComponent implements OnInit {

  trailerID: any = [];
  trailerDetails: any[] = [];
  saveSuccess: boolean;
  user_id:any = []
  allMessages: any = [];

  constructor(private route: ActivatedRoute,
              public apiService: ApiService) { }

  ngOnInit() {
    this.getTrailerIdByMsgId(this.route.snapshot.params['id']);
    this.getAllMessagesByParentId(this.route.snapshot.params['id']);
  }

  getTrailerIdByMsgId(id) {
     console.log(id);
      this.apiService.messagesDetails(id).subscribe( (response) => {
      this.trailerID = response.listing_id;
      this.getTrailerDetails();
      });
  }

  getTrailerDetails() {
      this.apiService.showListTrailer(this.trailerID).subscribe((res) => {
      let trailderObj = res;
      this.trailerDetails = Array.of(trailderObj);
      console.log(this.trailerDetails);
      let listing_user_id = trailderObj.user_id;
    });
  }

  getAllMessagesByParentId(id) {
      this.apiService.messagesByParentId(id).subscribe((res) => {
      this.allMessages = res;
      console.log(this.allMessages);
      // this.trailerDetails = Array.of(trailderObj);
      // let listing_user_id = trailderObj.user_id;
  });
  }

  onSubmit(form) {

  form.value.listing_id = this.trailerID;
  form.value.listing_user_id = this.user_id;

  let senderID = JSON.parse(localStorage.getItem('user'));
  form.value.sender_id = senderID.id;

  let parentId = this.route.snapshot.params['id'];
  form.value.parent_id = parentId;
    form.value.sendername=senderID.username;
  console.log(form.value);

  this.apiService.createMessage(form.value)
  .subscribe( (response) => {
    if (response) {
        this.saveSuccess = true;
        setTimeout(function() {
        this.saveSuccess = false;
        }.bind(this), 3000);
    } else {
        this.saveSuccess = false;
    }
  });
}

}
