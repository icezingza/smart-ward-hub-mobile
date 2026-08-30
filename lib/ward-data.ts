export type AlertStatus = "Open" | "Acknowledged" | "Resolved";
export type AlertSeverity = "Critical" | "Warning" | "Info";

export type Ward = {
  id: string;
  name: string;
  mode: "Local demo" | "Connected";
  lastSyncAt: string;
};

export type Patient = {
  id: string;
  bed: string;
  displayCode: string;
  riskLevel: "High" | "Medium" | "Low";
  latestReading: string;
  note?: string;
};

export type Alert = {
  id: string;
  patientId: string;
  severity: AlertSeverity;
  title: string;
  status: AlertStatus;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
};

export type Activity = {
  id: string;
  type: string;
  entityId: string;
  timestamp: string;
  actorLabel: string;
};

export type WardState = {
  ward: Ward;
  patients: Patient[];
  alerts: Alert[];
  activities: Activity[];
};

export const initialWardState: WardState = {
  ward: { id: "ward-a", name: "Ward A · Medical", mode: "Local demo", lastSyncAt: "08:42" },
  patients: [
    { id: "p-101", bed: "A-01", displayCode: "Patient 01", riskLevel: "High", latestReading: "SpO₂ 91% · 2 min ago" },
    { id: "p-102", bed: "A-02", displayCode: "Patient 02", riskLevel: "Medium", latestReading: "HR 84 bpm · 4 min ago" },
    { id: "p-103", bed: "A-03", displayCode: "Patient 03", riskLevel: "Low", latestReading: "Stable · 6 min ago" },
    { id: "p-104", bed: "A-04", displayCode: "Patient 04", riskLevel: "Medium", latestReading: "Temp 37.7°C · 8 min ago" },
  ],
  alerts: [
    { id: "a-001", patientId: "p-101", severity: "Critical", title: "Oxygen saturation below threshold", status: "Open", createdAt: "08:39" },
    { id: "a-002", patientId: "p-102", severity: "Warning", title: "Heart rate trend needs review", status: "Acknowledged", createdAt: "08:21", acknowledgedAt: "08:25" },
    { id: "a-003", patientId: "p-104", severity: "Info", title: "Temperature reading received", status: "Resolved", createdAt: "07:58", resolvedAt: "08:03" },
  ],
  activities: [
    { id: "log-1", type: "Alert created", entityId: "a-001", timestamp: "08:39", actorLabel: "Ward monitor" },
    { id: "log-2", type: "Alert acknowledged", entityId: "a-002", timestamp: "08:25", actorLabel: "You" },
    { id: "log-3", type: "Ward snapshot updated", entityId: "ward-a", timestamp: "08:42", actorLabel: "Local hub" },
  ],
};

export function formatNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
