import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
@Component({
  selector: 'rv-user-forget-password',
  templateUrl: './user-forget-password.component.html',
  styleUrls: ['./user-forget-password.component.scss']
})
export class UserForgetPasswordComponent implements OnInit {
  brandSlideVisible: boolean;
  constructor(private fb: FormBuilder, public apiService: ApiService) { }

  ngOnInit() {
    this.brandSlideVisible = true;
  }

  forgetPassword()
  {
    const data = Object.assign({}, {email:'singla.nikhil4@gmail.com'});
    this.apiService.forgetpasemail(data).subscribe((result) => {
      //console.log(this.rForm.value);
      console.log('send email also');
      console.log(data);
     
       });
  }

}
