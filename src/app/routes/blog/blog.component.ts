import { Component, OnInit,Renderer,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rv-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit {

  constructor(private renderer: Renderer) {this.renderer.setElementProperty(document.body, "scrollTop", 0); }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}
