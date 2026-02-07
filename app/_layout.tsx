import { Platform, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <View style={styles.appShell}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0a0f1a",
  },
  appShell: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
  },
});
