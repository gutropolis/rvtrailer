import { ApiService } from './../../api.service';
import { Component, OnInit, ViewEncapsulation,Pipe,PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderbyPipe } from '../../orderby.pipe';


@Component({
  selector: 'rv-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUserComponent implements OnInit {

users: any = [];
listLimit=10;
p: number;
messageClass;
message;
    

  constructor(public router: Router,
              public apiService: ApiService,
              private route: ActivatedRoute,
              
              ) {
               
               }

  ngOnInit() {
    
   this.getUserList();
    
  }
  getUserList()
  {
    this.apiService.getAllUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
     this.p=1;
      

    }, (err) => {
      console.log(err);
    });
  }

 
  deleteUser(id) {
  this.apiService.deleteUser(id).then((result) => {
   // this.router.navigateByUrl('./admin-user.component.html');
   // window.location.reload();
   this.router.navigate(['admin/user']);
   this.messageClass = 'alert alert-success';
   this.message = 'Success';
   this.getUserList();

  }, (err) => {
    console.log(err);
  });
}
loadMore() {
  this.listLimit = this.users.length + 5;
  console.log(this.listLimit);

  this.getUserList();

  
}
/*
console.log(this.counter + 'dat size'+this.data.length)

    for(let i=this.counter+1;i<this.data.length;i++)
    {
    this.content.push(this.data[i]);
    if(i%10==0) break;
    }
    this.counter+=10;
*/

}
