import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPackageComponent } from './admin-view-package.component';

describe('AdminViewPackageComponent', () => {
  let component: AdminViewPackageComponent;
  let fixture: ComponentFixture<AdminViewPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
