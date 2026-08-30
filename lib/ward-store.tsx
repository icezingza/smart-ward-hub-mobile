import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Activity, AlertStatus, WardState, formatNow, initialWardState } from "@/lib/ward-data";

const STORAGE_KEY = "smart-ward-hub-state-v1";

type WardStore = WardState & {
  isHydrated: boolean;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  addPatientNote: (patientId: string, note: string) => void;
  updateWardName: (name: string) => void;
  resetDemoData: () => void;
};

const WardContext = createContext<WardStore | null>(null);

function addActivity(state: WardState, activity: Omit<Activity, "id">): WardState {
  return { ...state, activities: [{ ...activity, id: `log-${Date.now()}` }, ...state.activities] };
}

export function WardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WardState>(initialWardState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => value && setState(JSON.parse(value) as WardState))
      .catch(() => undefined)
      .finally(() => setIsHydrated(true));
  }, []);

  useEffect(() => {
    if (isHydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [state, isHydrated]);

  const value = useMemo<WardStore>(() => ({
    ...state,
    isHydrated,
    acknowledgeAlert: (alertId) => setState((current) => {
      const alert = current.alerts.find((item) => item.id === alertId);
      if (!alert || alert.status !== "Open") return current;
      const next = { ...current, alerts: current.alerts.map((item) => item.id === alertId ? { ...item, status: "Acknowledged" as AlertStatus, acknowledgedAt: formatNow() } : item) };
      return addActivity(next, { type: "Alert acknowledged", entityId: alertId, timestamp: formatNow(), actorLabel: "You" });
    }),
    resolveAlert: (alertId) => setState((current) => {
      const alert = current.alerts.find((item) => item.id === alertId);
      if (!alert || alert.status === "Resolved") return current;
      const next = { ...current, alerts: current.alerts.map((item) => item.id === alertId ? { ...item, status: "Resolved" as AlertStatus, resolvedAt: formatNow() } : item) };
      return addActivity(next, { type: "Alert resolved", entityId: alertId, timestamp: formatNow(), actorLabel: "You" });
    }),
    addPatientNote: (patientId, note) => setState((current) => {
      const next = { ...current, patients: current.patients.map((patient) => patient.id === patientId ? { ...patient, note } : patient) };
      return addActivity(next, { type: "Patient note saved", entityId: patientId, timestamp: formatNow(), actorLabel: "You" });
    }),
    updateWardName: (name) => setState((current) => ({ ...current, ward: { ...current.ward, name: name.trim() || initialWardState.ward.name } })),
    resetDemoData: () => setState(initialWardState),
  }), [state, isHydrated]);

  return <WardContext.Provider value={value}>{children}</WardContext.Provider>;
}

export function useWard() {
  const value = useContext(WardContext);
  if (!value) throw new Error("useWard must be used within WardProvider");
  return value;
}
