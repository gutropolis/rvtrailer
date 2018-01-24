import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'rv-testimonial-box',
  templateUrl: './testimonial-box.component.html',
  styleUrls: ['./testimonial-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialBoxComponent implements OnInit {

  @Input('testimonial') element: {
    userPic: string,
    userName: string,
    userWords: string
  };

@Input() userPic: string;
@Input() userName: string;
@Input() userWords: string;

  constructor() { }

  ngOnInit() {
  }

}
