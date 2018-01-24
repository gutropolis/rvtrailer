import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-faq-renter',
  templateUrl: './faq-renter.component.html',
  styleUrls: ['./faq-renter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqRenterComponent implements OnInit {

  constructor(private app: AppComponent) {
    this.app.brandSlideVisible = false;
   }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}
