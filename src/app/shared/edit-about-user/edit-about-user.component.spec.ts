import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutUserComponent } from './edit-about-user.component';

describe('EditAboutUserComponent', () => {
  let component: EditAboutUserComponent;
  let fixture: ComponentFixture<EditAboutUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAboutUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAboutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
