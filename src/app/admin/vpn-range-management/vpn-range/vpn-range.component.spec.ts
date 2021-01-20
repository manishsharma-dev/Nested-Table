import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnRangeComponent } from './vpn-range.component';

describe('VpnRangeComponent', () => {
  let component: VpnRangeComponent;
  let fixture: ComponentFixture<VpnRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpnRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
