import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#94a3b8",
        headerStyle: { backgroundColor: "#1e293b" },
        headerTintColor: "#f8fafc",
        tabBarStyle: { backgroundColor: "#1e293b", borderTopColor: "#334155" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gender"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="adjectives"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cases"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="possessives"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
