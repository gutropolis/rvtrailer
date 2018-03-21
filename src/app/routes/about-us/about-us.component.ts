import { Component, OnInit,Renderer, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../../shared/app/app.component';

@Component({
  selector: 'rv-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {

  constructor(private app: AppComponent,private renderer: Renderer) {
    this.app.brandSlideVisible = false;
    this.renderer.setElementProperty(document.body, "scrollTop", 0);
   }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}


