import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOwnerComponent } from './about-owner.component';

describe('AboutOwnerComponent', () => {
  let component: AboutOwnerComponent;
  let fixture: ComponentFixture<AboutOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
