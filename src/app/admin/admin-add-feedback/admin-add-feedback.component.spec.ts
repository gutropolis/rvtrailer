import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFeedbackComponent } from './admin-add-feedback.component';

describe('AdminAddFeedbackComponent', () => {
  let component: AdminAddFeedbackComponent;
  let fixture: ComponentFixture<AdminAddFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
