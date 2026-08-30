import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useWard } from "@/lib/ward-store";
import { IconSymbol } from "@/components/ui/icon-symbol";

const filters = ["All", "Alerts", "Patients", "Ward"] as const;

type ActivityFilter = (typeof filters)[number];

export default function ActivityScreen() {
  const colors = useColors();
  const { activities } = useWard();
  const [filter, setFilter] = useState<ActivityFilter>("All");
  const visible = useMemo(() => activities.filter((item) => filter === "All" || (filter === "Alerts" && item.type.startsWith("Alert")) || (filter === "Patients" && item.type.startsWith("Patient")) || (filter === "Ward" && item.type.startsWith("Ward"))), [activities, filter]);
  return <ScreenContainer className="px-5"><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={[styles.eyebrow, { color: colors.muted }]}>AUDIT TIMELINE</Text><Text style={[styles.title, { color: colors.foreground }]}>Activity</Text><Text style={[styles.subtitle, { color: colors.muted }]}>A simple record of local workflow actions.</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={({ pressed }) => [styles.filter, { backgroundColor: filter === item ? colors.primary : colors.surface, borderColor: filter === item ? colors.primary : colors.border }, pressed && styles.pressed]}><Text style={{ color: filter === item ? "#FFFFFF" : colors.muted, fontWeight: "700", fontSize: 12 }}>{item}</Text></Pressable>)}</ScrollView>
    <View style={styles.timeline}>{visible.map((item, index) => <View key={item.id} style={styles.row}><View style={styles.markerColumn}><View style={[styles.marker, { backgroundColor: colors.primary }]}><IconSymbol name={item.type.includes("resolved") ? "checkmark.circle.fill" : "clock.fill"} size={13} color="#FFFFFF" /></View>{index < visible.length - 1 && <View style={[styles.line, { backgroundColor: colors.border }]} />}</View><View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.type, { color: colors.foreground }]}>{item.type}</Text><Text style={[styles.meta, { color: colors.muted }]}>{item.actorLabel} · {item.timestamp}</Text><Text style={[styles.entity, { color: colors.muted }]}>Reference {item.entityId}</Text></View></View>)}</View>
    {!visible.length && <View style={styles.empty}><Text style={[styles.emptyTitle, { color: colors.foreground }]}>No activity in this view</Text><Text style={[styles.emptyText, { color: colors.muted }]}>Choose another category.</Text></View>}
  </ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { paddingTop: 18, paddingBottom: 28 }, eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 28, fontWeight: "800", marginTop: 5 }, subtitle: { fontSize: 14, marginTop: 6 }, filters: { gap: 8, paddingVertical: 20 }, filter: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20, borderWidth: 1 }, timeline: { marginTop: 3 }, row: { flexDirection: "row", minHeight: 94 }, markerColumn: { width: 31, alignItems: "center" }, marker: { width: 27, height: 27, borderRadius: 14, alignItems: "center", justifyContent: "center" }, line: { width: 2, flex: 1, marginVertical: 3 }, card: { flex: 1, borderRadius: 15, borderWidth: 1, padding: 14, marginLeft: 10, marginBottom: 12 }, type: { fontSize: 14, fontWeight: "800" }, meta: { fontSize: 12, marginTop: 6 }, entity: { fontSize: 11, marginTop: 5 }, empty: { alignItems: "center", paddingTop: 55 }, emptyTitle: { fontSize: 16, fontWeight: "800" }, emptyText: { fontSize: 13, marginTop: 6 }, pressed: { opacity: 0.7 } });
