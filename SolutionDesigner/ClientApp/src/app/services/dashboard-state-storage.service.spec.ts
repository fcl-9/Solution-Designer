import { TestBed } from "@angular/core/testing";

import { DashboardStateStorageService } from "./dashboard-state-storage.service";

describe("DashboardStateStorageService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DashboardStateStorageService = TestBed.get(
      DashboardStateStorageService
    );
    expect(service).toBeTruthy();
  });
});
