import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentalTypeComponent } from './add-rental-type.component';

describe('AddRentalTypeComponent', () => {
  let component: AddRentalTypeComponent;
  let fixture: ComponentFixture<AddRentalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
