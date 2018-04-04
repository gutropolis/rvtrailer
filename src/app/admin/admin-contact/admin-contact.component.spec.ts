import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactComponent } from './admin-contact.component';

describe('AdminContactComponent', () => {
  let component: AdminContactComponent;
  let fixture: ComponentFixture<AdminContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});