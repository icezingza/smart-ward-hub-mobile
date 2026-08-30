import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useWard } from "@/lib/ward-store";

export default function PatientDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { patients, alerts, activities, addPatientNote } = useWard();
  const patient = patients.find((item) => item.id === id);
  const [note, setNote] = useState(patient?.note ?? "");
  const patientAlerts = useMemo(() => alerts.filter((alert) => alert.patientId === id), [alerts, id]);
  const patientActivities = useMemo(() => activities.filter((item) => item.entityId === id || patientAlerts.some((alert) => alert.id === item.entityId)), [activities, id, patientAlerts]);

  if (!patient) {
    return <ScreenContainer className="px-5"><View style={styles.empty}><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Patient not found</Text><Pressable onPress={() => router.back()}><Text style={[styles.link, { color: colors.primary }]}>Go back</Text></Pressable></View></ScreenContainer>;
  }

  const tone = patient.riskLevel === "High" ? colors.error : patient.riskLevel === "Medium" ? colors.warning : colors.success;
  const saveNote = () => { addPatientNote(patient.id, note); Alert.alert("Note saved", "This note is stored locally on this device."); };

  return (
    <ScreenContainer className="px-5">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, { borderColor: colors.border, backgroundColor: colors.surface }, pressed && styles.pressed]} accessibilityLabel="Go back"><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.eyebrow, { color: colors.muted }]}>PATIENT DETAIL</Text><View style={{ width: 44 }} /></View>
        <View style={styles.identity}><View style={[styles.bed, { backgroundColor: `${tone}18` }]}><Text style={[styles.bedText, { color: tone }]}>{patient.bed}</Text></View><View style={styles.identityCopy}><Text style={[styles.title, { color: colors.foreground }]}>{patient.displayCode}</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Operational context · local demo</Text></View></View>
        <View style={[styles.statusCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View><Text style={[styles.label, { color: colors.muted }]}>Risk level</Text><Text style={[styles.value, { color: tone }]}>{patient.riskLevel}</Text></View><View style={styles.divider} /><View style={styles.readingBox}><Text style={[styles.label, { color: colors.muted }]}>Latest reading</Text><Text style={[styles.reading, { color: colors.foreground }]}>{patient.latestReading}</Text></View></View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Related alerts</Text>
        {patientAlerts.length ? patientAlerts.map((alert) => <View key={alert.id} style={[styles.rowCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={[styles.dot, { backgroundColor: alert.severity === "Critical" ? colors.error : alert.severity === "Warning" ? colors.warning : colors.primary }]} /><View style={styles.rowCopy}><Text style={[styles.rowTitle, { color: colors.foreground }]}>{alert.title}</Text><Text style={[styles.meta, { color: colors.muted }]}>{alert.severity} · {alert.status} · {alert.createdAt}</Text></View></View>) : <Text style={[styles.muted, { color: colors.muted }]}>No alerts linked to this patient.</Text>}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Local note</Text>
        <TextInput value={note} onChangeText={setNote} multiline placeholder="Add a short workflow note" placeholderTextColor={colors.muted} style={[styles.noteInput, { color: colors.foreground, backgroundColor: colors.surface, borderColor: colors.border }]} accessibilityLabel="Patient local note" />
        <Pressable onPress={saveNote} style={({ pressed }) => [styles.save, { backgroundColor: colors.primary }, pressed && styles.pressed]}><Text style={styles.saveText}>Save note</Text></Pressable>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent activity</Text>
        {patientActivities.length ? patientActivities.slice(0, 4).map((item) => <Text key={item.id} style={[styles.activity, { color: colors.muted }]}>{item.type} · {item.timestamp}</Text>) : <Text style={[styles.muted, { color: colors.muted }]}>No local activity yet.</Text>}
        <Text style={[styles.disclaimer, { color: colors.muted }]}>Sample workflow data only. This screen is not for clinical decision-making.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: 18, paddingBottom: 32, gap: 14 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, back: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center" }, eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 1.5 }, identity: { flexDirection: "row", alignItems: "center", marginTop: 5 }, bed: { width: 58, height: 58, borderRadius: 17, alignItems: "center", justifyContent: "center" }, bedText: { fontSize: 17, fontWeight: "900" }, identityCopy: { marginLeft: 14 }, title: { fontSize: 26, fontWeight: "800" }, subtitle: { fontSize: 13, marginTop: 4 }, statusCard: { borderWidth: 1, borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", marginTop: 3 }, label: { fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.6 }, value: { fontSize: 21, fontWeight: "900", marginTop: 5 }, divider: { width: 1, height: 46, backgroundColor: "#D9E2EC", marginHorizontal: 18 }, readingBox: { flex: 1 }, reading: { fontSize: 14, fontWeight: "700", marginTop: 5 }, sectionTitle: { fontSize: 17, fontWeight: "800", marginTop: 9 }, rowCard: { borderWidth: 1, borderRadius: 14, padding: 13, flexDirection: "row", alignItems: "center" }, dot: { width: 9, height: 9, borderRadius: 5, marginRight: 11 }, rowCopy: { flex: 1 }, rowTitle: { fontSize: 13, fontWeight: "800" }, meta: { fontSize: 11, marginTop: 4 }, muted: { fontSize: 13 }, noteInput: { borderWidth: 1, borderRadius: 14, minHeight: 88, padding: 13, fontSize: 14, textAlignVertical: "top" }, save: { borderRadius: 13, alignItems: "center", paddingVertical: 14 }, saveText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 }, activity: { fontSize: 12, paddingVertical: 3 }, disclaimer: { fontSize: 11, lineHeight: 16, textAlign: "center", marginTop: 8 }, empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 15 }, emptyTitle: { fontSize: 18, fontWeight: "800" }, link: { fontSize: 14, fontWeight: "800" }, pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] } });
