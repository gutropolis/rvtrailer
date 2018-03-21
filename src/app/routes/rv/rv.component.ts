import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'rv-rv',
  templateUrl: './rv.component.html',
  styleUrls: ['./rv.component.scss']
})
export class RvComponent implements OnInit {

  constructor() { }

  brandSlideVisible: boolean;
  ngOnInit() {
    this.brandSlideVisible = true;
  }

}
