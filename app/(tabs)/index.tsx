import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doiti</Text>
      <Text style={styles.subtitle}>German Grammar Practice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  title: { fontSize: 32, fontWeight: "bold", color: "#f8fafc" },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 8 },
});
