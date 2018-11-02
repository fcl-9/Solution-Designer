import { TestBed } from '@angular/core/testing';

import { DashboardComponentStorageService } from './dashboard-component-storage.service';

describe('DashboardComponentStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardComponentStorageService = TestBed.get(DashboardComponentStorageService);
    expect(service).toBeTruthy();
  });
});
