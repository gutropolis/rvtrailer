import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from './../../api.service';

@Component({
  selector: 'rv-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  constructor(public apiService: ApiService,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(form) {
      this.apiService.getNewsLetters(form.value)
      .subscribe( (response) => {
        this.flashMessagesService.show('Thank You For Registration.', {cssClass: 'alert-success'});
      }, (err) => {
      console.log(err);
      this.flashMessagesService.show('This E-mail Id is Registered.', {cssClass: 'alert-danger'});
    });

      }
  }
