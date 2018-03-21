import { Component, OnInit,Renderer, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class TermsConditionComponent implements OnInit {

 constructor(private app: AppComponent,private renderer: Renderer) {
    this.app.brandSlideVisible = false;
    this.renderer.setElementProperty(document.body, "scrollTop", 0);
   }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}
