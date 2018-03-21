import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPackageComponent } from './admin-add-package.component';

describe('AdminAddPackageComponent', () => {
  let component: AdminAddPackageComponent;
  let fixture: ComponentFixture<AdminAddPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
