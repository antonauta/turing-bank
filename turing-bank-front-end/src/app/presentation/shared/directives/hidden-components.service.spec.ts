import { TestBed } from '@angular/core/testing';

import { HiddenComponentsService } from './hidden-components.service';

describe('HiddenComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiddenComponentsService = TestBed.get(HiddenComponentsService);
    expect(service).toBeTruthy();
  });
});
