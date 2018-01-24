import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPackageComponent } from './owner-package.component';

describe('OwnerPackageComponent', () => {
  let component: OwnerPackageComponent;
  let fixture: ComponentFixture<OwnerPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
