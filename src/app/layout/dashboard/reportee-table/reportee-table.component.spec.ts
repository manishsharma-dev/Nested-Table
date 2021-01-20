import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteeTableComponent } from './reportee-table.component';

describe('ReporteeTableComponent', () => {
  let component: ReporteeTableComponent;
  let fixture: ComponentFixture<ReporteeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
