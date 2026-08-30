import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useWard } from "@/lib/ward-store";

export default function DashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const { ward, patients, alerts, activities } = useWard();
  const openAlerts = alerts.filter((alert) => alert.status !== "Resolved");
  const criticalAlerts = openAlerts.filter((alert) => alert.severity === "Critical").length;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.muted }]}>SMART WARD HUB</Text>
            <Text style={[styles.title, { color: colors.foreground }]}>{ward.name}</Text>
            <View style={styles.statusRow}><View style={[styles.statusDot, { backgroundColor: colors.success }]} /><Text style={[styles.statusText, { color: colors.muted }]}>{ward.mode} · Updated {ward.lastSyncAt}</Text></View>
          </View>
          <Pressable onPress={() => router.push("/settings" as any)} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="gearshape.fill" size={22} color={colors.foreground} /></Pressable>
        </View>

        <View style={styles.heroCard}><View><Text style={styles.heroLabel}>Open attention items</Text><Text style={styles.heroNumber}>{openAlerts.length}</Text><Text style={styles.heroHint}>{criticalAlerts ? `${criticalAlerts} critical · review now` : "No critical items"}</Text></View><View style={styles.heroIcon}><IconSymbol name="bell.fill" size={30} color="#DFF7F2" /></View></View>

        <View style={styles.grid}>
          <MetricCard label="Patients" value={String(patients.length)} detail="in this ward" color={colors.primary} onPress={() => router.push("/(tabs)/patients")} />
          <MetricCard label="Open alerts" value={String(openAlerts.length)} detail="needs review" color={colors.warning} onPress={() => router.push("/(tabs)/alerts")} />
        </View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent activity</Text><Pressable onPress={() => router.push("/(tabs)/activity")}><Text style={[styles.link, { color: colors.primary }]}>See all</Text></Pressable></View>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>{activities.slice(0, 3).map((item) => <View key={item.id} style={styles.activityRow}><View style={[styles.activityDot, { backgroundColor: colors.primary }]} /><View style={styles.activityCopy}><Text style={[styles.activityType, { color: colors.foreground }]}>{item.type}</Text><Text style={[styles.activityMeta, { color: colors.muted }]}>{item.actorLabel} · {item.timestamp}</Text></View></View>)}</View>
        <Text style={[styles.disclaimer, { color: colors.muted }]}>Local demo mode. This view is for workflow testing, not clinical decision-making.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function MetricCard({ label, value, detail, color, onPress }: { label: string; value: string; detail: string; color: string; onPress: () => void }) {
  const colors = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><Text style={[styles.metricLabel, { color: colors.muted }]}>{label}</Text><Text style={[styles.metricValue, { color }]}>{value}</Text><Text style={[styles.metricDetail, { color: colors.muted }]}>{detail}</Text></Pressable>;
}

const styles = StyleSheet.create({ content: { paddingTop: 18, paddingBottom: 28, gap: 18 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }, eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 25, fontWeight: "800", marginTop: 5 }, statusRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 8 }, statusDot: { width: 8, height: 8, borderRadius: 4 }, statusText: { fontSize: 12 }, iconButton: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center" }, heroCard: { backgroundColor: "#102A43", borderRadius: 20, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, heroLabel: { color: "#DFF7F2", fontSize: 13, fontWeight: "700" }, heroNumber: { color: "#FFFFFF", fontSize: 42, fontWeight: "800", lineHeight: 48, marginTop: 4 }, heroHint: { color: "#BEE3DB", fontSize: 13, marginTop: 2 }, heroIcon: { width: 58, height: 58, borderRadius: 18, backgroundColor: "#0F766E", alignItems: "center", justifyContent: "center" }, grid: { flexDirection: "row", gap: 12 }, metricCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16 }, metricLabel: { fontSize: 13, fontWeight: "700" }, metricValue: { fontSize: 30, fontWeight: "800", marginTop: 8 }, metricDetail: { fontSize: 12, marginTop: 2 }, sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 3 }, sectionTitle: { fontSize: 18, fontWeight: "800" }, link: { fontSize: 13, fontWeight: "800" }, card: { borderRadius: 16, borderWidth: 1, padding: 15 }, activityRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 }, activityDot: { width: 9, height: 9, borderRadius: 5, marginRight: 12 }, activityCopy: { flex: 1 }, activityType: { fontSize: 14, fontWeight: "700" }, activityMeta: { fontSize: 12, marginTop: 3 }, disclaimer: { fontSize: 11, lineHeight: 16, textAlign: "center", paddingHorizontal: 14 }, pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] }, });
