import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconName = keyof typeof MAPPING;
const MAPPING = {
  "house.fill": "home",
  "bell.fill": "notifications-none",
  "person.2.fill": "people-outline",
  "clock.fill": "history",
  "gearshape.fill": "settings",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "checkmark.circle.fill": "check-circle",
  "exclamationmark.triangle.fill": "warning",
  "arrow.clockwise": "sync",
  "magnifyingglass": "search",
  "note.text": "note-add",
  "xmark": "close",
} as const satisfies Record<string, ComponentProps<typeof MaterialIcons>["name"]>;

export function IconSymbol({ name, size = 24, color, style, weight }: { name: IconName; size?: number; color: string | OpaqueColorValue; style?: StyleProp<TextStyle>; weight?: string }) {
  void weight;
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
