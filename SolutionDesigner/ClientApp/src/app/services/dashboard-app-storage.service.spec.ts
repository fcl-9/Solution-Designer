import { TestBed } from '@angular/core/testing';

import { DashboardAppStorageService } from './dashboard-app-storage.service';

describe('DashboardAppStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardAppStorageService = TestBed.get(DashboardAppStorageService);
    expect(service).toBeTruthy();
  });
});
