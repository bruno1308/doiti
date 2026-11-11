import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/theme";
import { getSdsServer, saveSdsServer, serverReady } from "../../lib/sds/api";
import { Button, ui } from "./ui";

/** Where the voice examiner and the AI rating live. Stored on this device only. */
export default function ServerSettings() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  useEffect(() => {
    let active = true;
    getSdsServer().then(server => { if (active) { setUrl(server.url); setCode(server.code); } }).catch(() => {});
    return () => { active = false; };
  }, []);
  const valid = serverReady({ url: url.trim(), code: code.trim() }) || (!url.trim() && !code.trim());
  const save = () => saveSdsServer({ url, code }).then(() => setStatus("saved")).catch(() => setStatus("error"));
  return <View style={ui.card}>
    <Text accessibilityRole="header" style={ui.heading}>SDS voice examiner</Text>
    <Text style={ui.help}>The interview and the AI rating of your writing run through your own Doiti server. Reading and listening work without it.</Text>
    <Text style={ui.label}>Server address</Text>
    <TextInput accessibilityLabel="Server address" value={url} onChangeText={value => { setUrl(value); setStatus("idle"); }} placeholder="https://your-project.vercel.app"
      placeholderTextColor={colors.textMuted} autoCapitalize="none" autoCorrect={false} keyboardType="url" style={styles.input} />
    <Text style={ui.label}>Access code</Text>
    <TextInput accessibilityLabel="Access code" value={code} onChangeText={value => { setCode(value); setStatus("idle"); }} secureTextEntry autoCapitalize="none" autoCorrect={false} style={styles.input} />
    {!valid && <Text style={ui.error}>Enter an address starting with https:// and the access code.</Text>}
    <Button title="Save" disabled={!valid} onPress={save} />
    <Text accessibilityLiveRegion="polite" style={status === "error" ? ui.error : ui.help}>{status === "saved" ? "Saved on this device" : status === "error" ? "Could not save. Please retry." : " "}</Text>
  </View>;
}
const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: colors.text, minHeight: 46 },
});
