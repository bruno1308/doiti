import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallApp() {
  const pathname = usePathname();
  const [offer, setOffer] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const prompting = useRef(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const updateDisplay = () => setInstalled(standalone.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const capture = (event: Event) => {
      event.preventDefault();
      setOffer(event as InstallPrompt);
      setError("");
    };
    const onInstalled = () => { setInstalled(true); setOffer(null); };
    updateDisplay();
    window.addEventListener("beforeinstallprompt", capture);
    window.addEventListener("appinstalled", onInstalled);
    standalone.addEventListener("change", updateDisplay);
    return () => {
      window.removeEventListener("beforeinstallprompt", capture);
      window.removeEventListener("appinstalled", onInstalled);
      standalone.removeEventListener("change", updateDisplay);
    };
  }, []);

  // Keep listening across navigation, but never interrupt a practice session.
  if (pathname !== "/" || installed || dismissed || (!offer && !error)) return null;
  const install = async () => {
    if (!offer || prompting.current) return;
    prompting.current = true;
    setBusy(true);
    try {
      await offer.prompt();
      const choice = await offer.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      else setDismissed(true);
    } catch {
      setError("Open your browser menu and choose Install app or Add to Home screen.");
    } finally {
      // Each browser event can only be used once.
      setOffer(null);
      setBusy(false);
      prompting.current = false;
    }
  };
  return <View style={styles.card}>
    <Ionicons name="download-outline" size={23} color={colors.primary} accessible={false} />
    <View style={styles.body}>
      <Text style={styles.title}>Doiti on your home screen</Text>
      <Text style={styles.detail}>Open it like an app, in its own window.</Text>
      {error ? <Text accessibilityRole="alert" style={styles.detail}>{error}</Text> :
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} onPress={install} style={styles.install}>
          <Text style={styles.installText}>{busy ? "Opening…" : "Install Doiti"}</Text>
        </Pressable>}
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel="Dismiss installation offer" onPress={() => setDismissed(true)} style={styles.dismiss}>
      <Ionicons name="close" size={20} color={colors.textSecondary} />
    </Pressable>
  </View>;
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 14, backgroundColor: colors.green, borderBottomWidth: 1, borderBottomColor: colors.border, alignItems: "flex-start" },
  body: { flex: 1, gap: 6 }, title: { color: colors.text, fontSize: 16, fontWeight: "700" },
  detail: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  install: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start", paddingHorizontal: 14, borderRadius: 9, marginTop: 3, backgroundColor: colors.primary },
  installText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
  dismiss: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", margin: -8 },
});
