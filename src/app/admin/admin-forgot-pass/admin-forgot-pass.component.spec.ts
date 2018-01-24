import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForgotPassComponent } from './admin-forgot-pass.component';

describe('AdminForgotPassComponent', () => {
  let component: AdminForgotPassComponent;
  let fixture: ComponentFixture<AdminForgotPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminForgotPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
