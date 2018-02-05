import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRentalTypeComponent } from './view-rental-type.component';

describe('ViewRentalTypeComponent', () => {
  let component: ViewRentalTypeComponent;
  let fixture: ComponentFixture<ViewRentalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRentalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRentalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
