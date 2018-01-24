import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAdsComponent } from './owner-ads.component';

describe('OwnerAdsComponent', () => {
  let component: OwnerAdsComponent;
  let fixture: ComponentFixture<OwnerAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
