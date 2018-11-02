import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PowerAppComponent } from "./power-app.component";

describe("PowerAppComponent", () => {
  let component: PowerAppComponent;
  let fixture: ComponentFixture<PowerAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PowerAppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
