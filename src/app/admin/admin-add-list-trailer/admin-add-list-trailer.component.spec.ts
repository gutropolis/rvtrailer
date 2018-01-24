import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddListTrailerComponent } from './admin-add-list-trailer.component';

describe('AdminAddListTrailerComponent', () => {
  let component: AdminAddListTrailerComponent;
  let fixture: ComponentFixture<AdminAddListTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddListTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddListTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
