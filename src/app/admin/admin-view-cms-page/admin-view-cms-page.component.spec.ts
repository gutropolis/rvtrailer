import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCmsPageComponent } from './admin-view-cms-page.component';

describe('AdminViewCmsPageComponent', () => {
  let component: AdminViewCmsPageComponent;
  let fixture: ComponentFixture<AdminViewCmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewCmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
