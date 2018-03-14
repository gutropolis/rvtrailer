import { ApiService } from './../../api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
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
  user_name: any = [];
  listner_userid:any=[];
  users:any=[];
  userid:any=[];
  messageDetails:any=[];
  user_recieverid:any=[];
  user_senderid:any=[];
  constructor(private route: ActivatedRoute,
              public apiService: ApiService) { 
                this.getUserList();
              }

  ngOnInit() {
    this.getTrailerIdByMsgId(this.route.snapshot.params['id']);
    this.getAllMessagesByParentId(this.route.snapshot.params['id']);
    this.getMessageById(this.route.snapshot.params['id']);
    Observable.interval(2000).subscribe(x => {
      this.getAllMessagesByParentId(this.route.snapshot.params['id']);
    });

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
     this.listner_userid = trailderObj.user_id;
      console.log('Listner id is '+ this.listner_userid);
    });
  }


    getAllMessagesByParentId(id) {
      this.apiService.messagesByParentId(id).subscribe((res) => {
      this.allMessages = res;
      //this.listerUser=this.allMessages.listing_user_id;

      console.log(this.allMessages);
      let user = JSON.parse(localStorage.getItem('user'));
      this.user_name=user.username;
      this.userid=user.id;
    
      // this.trailerDetails = Array.of(trailderObj);
      // let listing_user_id = trailderObj.user_id;
  });
  }

  onSubmit(form) {

  form.value.listing_id = this.trailerID;
  form.value.listing_user_id =  this.listner_userid;
  console.log('after submit listing user id is '+ this.listner_userid);

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
        this.getAllMessagesByParentId(this.route.snapshot.params['id']);
        form.reset();
        setTimeout(function() {
        this.saveSuccess = false;
        }.bind(this), 3000);
    } else {
        this.saveSuccess = false;
    }
  });
}
getUserList()
{
  this.apiService.getAllUsers().subscribe((res) => {
    this.users = res;
  });
}

getMessageById(ids) {
  
    this.apiService.messagesDetails(ids).subscribe( (response) => {
     this.messageDetails =response;
     this.user_recieverid=this.messageDetails.listings_user_id;
     this.user_senderid=this.messageDetails.sender_id;

     console.log('Message reciever id'+this.user_recieverid);
     console.log('Message sender id'+this.user_senderid);
     console.log("Message details by ajay"+JSON.stringify(this.messageDetails));
    });
}

}