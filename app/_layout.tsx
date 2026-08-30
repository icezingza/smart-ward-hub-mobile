import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/lib/theme-provider";
import { WardProvider } from "@/lib/ward-store";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <WardProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </WardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
