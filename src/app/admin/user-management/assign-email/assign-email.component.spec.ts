import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmailComponent } from './assign-email.component';

describe('AssignEmailComponent', () => {
  let component: AssignEmailComponent;
  let fixture: ComponentFixture<AssignEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
