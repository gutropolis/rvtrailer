import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewFeedbackComponent } from './admin-view-feedback.component';

describe('AdminViewFeedbackComponent', () => {
  let component: AdminViewFeedbackComponent;
  let fixture: ComponentFixture<AdminViewFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
