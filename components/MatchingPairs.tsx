import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { LayoutRectangle } from "react-native";
import type { MatchExercise } from "../lib/overall-types";
import { connectPair, shuffled } from "../lib/overall-logic";
import { colors, cardEdge } from "../constants/theme";

const pairColors = ["#34626b", "#654b79", "#866018", "#884764", "#346456"];
export default function MatchingPairs({ exercise, slots, onChange, disabled, checked }: {
  exercise: MatchExercise; slots: (number | null)[]; onChange: (slots: (number | null)[]) => void; disabled: boolean; checked: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [width, setWidth] = useState(0);
  const [leftBoxes, setLeftBoxes] = useState<Record<number, LayoutRectangle>>({});
  const [rightBoxes, setRightBoxes] = useState<Record<number, LayoutRectangle>>({});
  const rightOrder = useMemo(() => shuffled(exercise.pairs.map((_, i) => i)), [exercise]);
  const status = (left: number) => checked ? (slots[left] === left ? "Correct" : "Incorrect") : `Pair ${left + 1}`;
  const color = (left: number) => checked ? (slots[left] === left ? colors.success : colors.error) : pairColors[left % pairColors.length];
  return <View style={styles.card}>
    <Text accessibilityLiveRegion="polite" style={styles.help}>{checked ? "Your connections are checked below." : selected === null ? "Tap a word on the left, then its partner on the right." : `Now choose a partner for “${exercise.pairs[selected].left}”.`}</Text>
    <View style={styles.headings}><Text style={styles.heading}>{exercise.leftLabel}</Text><Text style={styles.heading}>{exercise.rightLabel}</Text></View>
    <View style={styles.board} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {slots.map((right, left) => {
          if (right === null || !leftBoxes[left] || !rightBoxes[right] || !width) return null;
          const a = leftBoxes[left], b = rightBoxes[right];
          const x1 = a.width, x2 = width - b.width;
          const y1 = a.y + a.height / 2, y2 = b.y + b.height / 2;
          const length = Math.hypot(x2 - x1, y2 - y1);
          return <View key={left} style={{ position: "absolute", left: (x1 + x2 - length) / 2, top: (y1 + y2) / 2 - 1,
            height: 2, width: length, backgroundColor: color(left), transform: [{ rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }] }} />;
        })}
      </View>
      <View style={styles.column}>{exercise.pairs.map((pair, left) => <Pressable key={pair.left} accessibilityRole="button"
        accessibilityLabel={`Left: ${pair.left}${slots[left] !== null ? `, connected to ${exercise.pairs[slots[left]!].right}` : ""}`}
        accessibilityState={{ selected: selected === left, disabled }} disabled={disabled}
        onLayout={e => { const box = e.nativeEvent.layout; setLeftBoxes(old => ({ ...old, [left]: box })); }}
        onPress={() => setSelected(selected === left ? null : left)}
        style={[styles.tile, { borderColor: selected === left || slots[left] !== null ? color(left) : colors.border }, selected === left && styles.selected]}>
        <Text style={styles.word}>{pair.left}</Text>
        <Text style={[styles.tag, { color: color(left) }]}>{slots[left] === null ? selected === left ? "Selected" : "○" : status(left)}</Text>
      </Pressable>)}</View>
      <View style={styles.column}>{rightOrder.map(right => {
        const left = slots.indexOf(right);
        return <Pressable key={exercise.pairs[right].right} accessibilityRole="button" accessibilityLabel={`Right: ${exercise.pairs[right].right}${left >= 0 ? `, connected to ${exercise.pairs[left].left}` : ""}`}
          accessibilityState={{ disabled: disabled || selected === null }} disabled={disabled || selected === null}
          onLayout={e => { const box = e.nativeEvent.layout; setRightBoxes(old => ({ ...old, [right]: box })); }}
          onPress={() => { if (selected !== null) { onChange(connectPair(slots, selected, right)); setSelected(null); } }}
          style={[styles.tile, left >= 0 && { borderColor: color(left) }]}>
          <Text style={styles.word}>{exercise.pairs[right].right}</Text>
          <Text style={[styles.tag, left >= 0 && { color: color(left) }]}>{left >= 0 ? status(left) : "○"}</Text>
        </Pressable>;
      })}</View>
    </View>
    {!disabled && <View style={styles.actions}>
      <Pressable accessibilityRole="button" accessibilityLabel="Clear selected connection" disabled={selected === null || slots[selected] === null}
        onPress={() => { if (selected !== null) onChange(connectPair(slots, selected, null)); }} style={styles.action}><Text style={styles.help}>Disconnect selected</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => { onChange(slots.map(() => null)); setSelected(null); }} style={styles.action}><Text style={styles.help}>Reset pairs</Text></Pressable>
    </View>}
  </View>;
}
const styles = StyleSheet.create({
  card: { ...cardEdge, padding: 12, borderRadius: 21, backgroundColor: colors.surface, gap: 12 },
  help: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  headings: { flexDirection: "row", justifyContent: "space-between" },
  heading: { width: "43%", color: colors.textSecondary, fontSize: 13, fontWeight: "700" },
  board: { flexDirection: "row", justifyContent: "space-between" },
  column: { width: "43%", gap: 10 },
  tile: { ...cardEdge, minHeight: 64, justifyContent: "center", borderWidth: 2, borderColor: colors.border, borderRadius: 12, padding: 10, backgroundColor: colors.background, gap: 5 },
  selected: { backgroundColor: colors.green },
  word: { color: colors.text, fontSize: 17, lineHeight: 23, fontWeight: "600" },
  tag: { fontSize: 11, color: colors.textSecondary },
  actions: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  action: { minHeight: 44, justifyContent: "center", paddingVertical: 8 },
});
