import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewComponent } from './owner-review.component';

describe('OwnerReviewComponent', () => {
  let component: OwnerReviewComponent;
  let fixture: ComponentFixture<OwnerReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
