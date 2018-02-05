import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRentalTypeComponent } from './show-rental-type.component';

describe('ShowRentalTypeComponent', () => {
  let component: ShowRentalTypeComponent;
  let fixture: ComponentFixture<ShowRentalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRentalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRentalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
