import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewListTrailerComponent } from './admin-view-list-trailer.component';

describe('AdminViewListTrailerComponent', () => {
  let component: AdminViewListTrailerComponent;
  let fixture: ComponentFixture<AdminViewListTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewListTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewListTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
