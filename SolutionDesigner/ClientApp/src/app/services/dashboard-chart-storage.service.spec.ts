import { TestBed } from '@angular/core/testing';

import { DashboardChartStorageService } from './dashboard-chart-storage.service';

describe('DashboardChartStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardChartStorageService = TestBed.get(DashboardChartStorageService);
    expect(service).toBeTruthy();
  });
});
