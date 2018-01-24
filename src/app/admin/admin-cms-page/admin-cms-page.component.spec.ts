import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCmsPageComponent } from './admin-cms-page.component';

describe('AdminCmsPageComponent', () => {
  let component: AdminCmsPageComponent;
  let fixture: ComponentFixture<AdminCmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
