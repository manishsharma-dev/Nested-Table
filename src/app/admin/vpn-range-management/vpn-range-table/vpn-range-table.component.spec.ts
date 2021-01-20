import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnRangeTableComponent } from './vpn-range-table.component';

describe('VpnRangeTableComponent', () => {
  let component: VpnRangeTableComponent;
  let fixture: ComponentFixture<VpnRangeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpnRangeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnRangeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
