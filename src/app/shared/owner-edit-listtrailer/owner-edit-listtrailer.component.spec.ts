import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditListtrailerComponent } from './owner-edit-listtrailer.component';

describe('OwnerEditListtrailerComponent', () => {
  let component: OwnerEditListtrailerComponent;
  let fixture: ComponentFixture<OwnerEditListtrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerEditListtrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerEditListtrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
