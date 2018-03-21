import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPackageComponent } from './admin-edit-package.component';

describe('AdminEditPackageComponent', () => {
  let component: AdminEditPackageComponent;
  let fixture: ComponentFixture<AdminEditPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
