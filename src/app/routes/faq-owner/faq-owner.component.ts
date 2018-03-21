import { Component, OnInit,Renderer, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rv-faq-owner',
  templateUrl: './faq-owner.component.html',
  styleUrls: ['./faq-owner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FaqOwnerComponent implements OnInit {

  constructor(private renderer: Renderer) {
    this.renderer.setElementProperty(document.body, "scrollTop", 0);
   }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}
