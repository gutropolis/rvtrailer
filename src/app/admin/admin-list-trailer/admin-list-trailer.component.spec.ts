import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListTrailerComponent } from './admin-list-trailer.component';

describe('AdminListTrailerComponent', () => {
  let component: AdminListTrailerComponent;
  let fixture: ComponentFixture<AdminListTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
