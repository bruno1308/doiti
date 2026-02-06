import { View, Text, StyleSheet } from "react-native";

export default function GenderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gender Quiz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" },
  text: { color: "#f8fafc", fontSize: 24 },
});
