import { TestBed } from '@angular/core/testing';

import { Theme.ServicesService } from './theme.services.service';

describe('Theme.ServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Theme.ServicesService = TestBed.get(Theme.ServicesService);
    expect(service).toBeTruthy();
  });
});
