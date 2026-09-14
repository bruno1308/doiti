import { allPracticeModes as practiceModes } from "../../data/practice-modes";
import { colors } from "../../constants/theme";
import { Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontSize: 16, fontWeight: "700" },
        headerLeft: () => <Pressable accessibilityRole="button" accessibilityLabel="Back to decks" onPress={() => router.navigate("/")} style={{ width: 48, height: 48, alignItems: "center", justifyContent: "center" }}><Ionicons name="arrow-back" size={22} color={colors.text} /></Pressable>,
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      {practiceModes.map(mode => <Tabs.Screen key={mode.id} name={mode.id} options={{ title: mode.title, href: null }} />)}
      <Tabs.Screen name="topics" options={{ title: "Grammar library", href: null }} />
      <Tabs.Screen name="overall-a1" options={{ title: "Overall A1", href: null }} />
      <Tabs.Screen name="overall-a2" options={{ title: "Overall A2", href: null }} />
      <Tabs.Screen
        name="index"
        options={{
          title: "Decks",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="settings" options={{
        title: "Settings",
        tabBarIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
      }} />
    </Tabs>
  );
}
