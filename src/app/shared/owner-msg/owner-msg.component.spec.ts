import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMsgComponent } from './owner-msg.component';

describe('OwnerMsgComponent', () => {
  let component: OwnerMsgComponent;
  let fixture: ComponentFixture<OwnerMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
