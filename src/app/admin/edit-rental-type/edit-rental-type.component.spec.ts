import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentalTypeComponent } from './edit-rental-type.component';

describe('EditRentalTypeComponent', () => {
  let component: EditRentalTypeComponent;
  let fixture: ComponentFixture<EditRentalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRentalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRentalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
