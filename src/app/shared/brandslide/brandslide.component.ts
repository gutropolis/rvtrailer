import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rv-brandslide',
  templateUrl: './brandslide.component.html',
  styleUrls: ['./brandslide.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandslideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



testimonials: any[] = [
  {
    userPic: 'brand-1.png',
   
  },
  {
    userPic: 'brand-2.png',
    
  },
  {
    userPic: 'brand-3.png',
    
  },
  {
    userPic: 'brand-4.png',
   
  },
];
}