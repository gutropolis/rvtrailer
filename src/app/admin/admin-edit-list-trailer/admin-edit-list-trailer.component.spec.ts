import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditListTrailerComponent } from './admin-edit-list-trailer.component';

describe('AdminEditListTrailerComponent', () => {
  let component: AdminEditListTrailerComponent;
  let fixture: ComponentFixture<AdminEditListTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditListTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditListTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
