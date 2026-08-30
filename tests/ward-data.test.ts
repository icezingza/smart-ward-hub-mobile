import { describe, expect, it } from "vitest";
import { initialWardState } from "../lib/ward-data";

describe("Smart Ward Hub demo data", () => {
  it("contains a usable ward snapshot without real patient identity", () => {
    expect(initialWardState.ward.name).toBe("Ward A · Medical");
    expect(initialWardState.patients).toHaveLength(4);
    expect(initialWardState.patients.every((patient) => patient.displayCode.startsWith("Patient"))).toBe(true);
  });

  it("exposes alert lifecycle states for the queue filters", () => {
    expect(initialWardState.alerts.map((alert) => alert.status).sort()).toEqual(["Acknowledged", "Open", "Resolved"].sort());
    expect(initialWardState.alerts.some((alert) => alert.severity === "Critical" && alert.status === "Open")).toBe(true);
  });
});
