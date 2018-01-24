import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCmsPageComponent } from './admin-add-cms-page.component';

describe('AdminAddCmsPageComponent', () => {
  let component: AdminAddCmsPageComponent;
  let fixture: ComponentFixture<AdminAddCmsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCmsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
