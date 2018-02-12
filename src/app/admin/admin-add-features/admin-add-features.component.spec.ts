import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFeaturesComponent } from './admin-add-features.component';

describe('AdminAddFeaturesComponent', () => {
  let component: AdminAddFeaturesComponent;
  let fixture: ComponentFixture<AdminAddFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
