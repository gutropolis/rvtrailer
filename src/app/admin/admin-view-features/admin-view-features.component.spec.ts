import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewFeaturesComponent } from './admin-view-features.component';

describe('AdminViewFeaturesComponent', () => {
  let component: AdminViewFeaturesComponent;
  let fixture: ComponentFixture<AdminViewFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
