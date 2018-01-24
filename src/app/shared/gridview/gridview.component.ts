import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rv-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridviewComponent implements OnInit {

  @Input('rvInfo') element:{
    photo: any,
    rvName: string,
    rvPrice: string,
    location: string,
    year: number,
    guest: number,
    province: string;
  }

  @Input() photo: any;
  @Input() rvName: string;
  @Input() rvPrice: string;
  @Input() location: string;
  @Input() province: string;
  @Input() year: number;
  @Input() guest: number;

  constructor() { }

  ngOnInit() {
  }

}
