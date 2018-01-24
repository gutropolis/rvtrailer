import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDetailOwnerComponent } from './msg-detail-owner.component';

describe('MsgDetailOwnerComponent', () => {
  let component: MsgDetailOwnerComponent;
  let fixture: ComponentFixture<MsgDetailOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgDetailOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDetailOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
