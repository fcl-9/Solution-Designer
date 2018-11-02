import { TestBed } from "@angular/core/testing";

import { ConnectBridgeDataRequesterService } from "./connect-bridge-data-requester.service";

describe("ConnectBridgeDataRequesterService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ConnectBridgeDataRequesterService = TestBed.get(
      ConnectBridgeDataRequesterService
    );
    expect(service).toBeTruthy();
  });
});
