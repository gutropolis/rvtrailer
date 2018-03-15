import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { RecaptchaModule } from 'ng2-recaptcha';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { ApiService } from './../../api.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
@Component({
  selector: 'rv-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit {
  saveSuccess: boolean;
  form: FormGroup;
  constructor(private app: AppComponent,
    public router: Router,
    public apiService: ApiService,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private formBuilder: FormBuilder,) {
      let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let phone_pattern=/^\+?\d{10}$/;
            this.form = this.formBuilder.group({
              'name':[null,Validators.required],
            'email' : [null, [Validators.required, Validators.pattern(emailRegex)]],
            'phone' : [null, [Validators.required, Validators.pattern(phone_pattern), Validators.minLength(10), Validators.maxLength(10)]],
            'subject' : [null, Validators.required],
            'msg' : [null, Validators.required],
            'validate' : ''
          });

     }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

onSubmitContact()
{
  
 // console.log('values is here'+JSON.stringify(form.value));
  this.saveSuccess=true;

}


}
