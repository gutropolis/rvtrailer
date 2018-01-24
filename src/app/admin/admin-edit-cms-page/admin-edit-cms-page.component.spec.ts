import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCmsPageComponent } from './admin-edit-cms-page.component';

describe('AdminEditCmsPageComponent', () => {
  let component: AdminEditCmsPageComponent;
  let fixture: ComponentFixture<AdminEditCmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditCmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
