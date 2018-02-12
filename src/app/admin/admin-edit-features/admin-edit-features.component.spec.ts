import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFeaturesComponent } from './admin-edit-features.component';

describe('AdminEditFeaturesComponent', () => {
  let component: AdminEditFeaturesComponent;
  let fixture: ComponentFixture<AdminEditFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
