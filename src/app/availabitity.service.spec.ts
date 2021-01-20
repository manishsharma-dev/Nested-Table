import { TestBed } from '@angular/core/testing';

import { AvailabitityService } from './availabitity.service';

describe('AvailabitityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailabitityService = TestBed.get(AvailabitityService);
    expect(service).toBeTruthy();
  });
});
