import React, { useRef, useState } from "react";
import { PanResponder, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";
import { placeChunk, shuffled } from "../lib/overall-logic";

type Point = { x: number; y: number };
type Rect = Point & { width: number; height: number };
type Target = number | "bank" | null;

interface Props {
  chunks: string[];
  slots: (number | null)[];
  onChange: (slots: (number | null)[]) => void;
  disabled: boolean;
  accent: string;
  onDragStateChange: (dragging: boolean) => void;
}

function Piece({ text, label, disabled, accent, dimmed, onTap, onStart, onMove, onDrop, onCancel }: {
  text: string; label: string; disabled: boolean; accent: string; dimmed: boolean;
  onTap: () => void; onStart: (p: Point) => void; onMove: (p: Point) => void;
  onDrop: (p: Point) => void; onCancel: () => void;
}) {
  // Keep responders stable while reading fresh props during an active gesture.
  const handlers = useRef({ disabled, onStart, onMove, onDrop, onCancel, onTap });
  handlers.current = { disabled, onStart, onMove, onDrop, onCancel, onTap };
  const dragged = useRef(false);
  const origin = useRef<Point>({ x: 0, y: 0 });
  const [responder] = useState(() => PanResponder.create({
    onStartShouldSetPanResponderCapture: () => !handlers.current.disabled,
    onPanResponderGrant: event => {
      dragged.current = false;
      origin.current = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY };
    },
    onPanResponderMove: event => {
      const point = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY };
      if (!dragged.current && Math.abs(point.x - origin.current.x) + Math.abs(point.y - origin.current.y) > 6) {
        dragged.current = true;
        handlers.current.onStart(point);
      }
      if (dragged.current) handlers.current.onMove(point);
    },
    onPanResponderRelease: event => {
      const point = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY };
      if (dragged.current) handlers.current.onDrop(point);
      else handlers.current.onTap();
    },
    onPanResponderTerminate: () => handlers.current.onCancel(),
    onPanResponderTerminationRequest: () => false,
  }));
  return (
    <View {...responder.panHandlers} style={[styles.pieceWrapper, Platform.OS === "web" && { touchAction: "none" }]}>
      <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityHint="Drag to a slot, or activate to move this piece."
        disabled={disabled} onPressIn={() => { dragged.current = false; }} onPress={() => { if (!dragged.current) onTap(); }}
        style={({ pressed }) => [styles.piece, { borderColor: accent }, (pressed || dimmed) && styles.dimmed]}>
        <Text selectable={false} style={styles.pieceText}>{text}</Text>
        <Text selectable={false} style={styles.grip}>⠿</Text>
      </Pressable>
    </View>
  );
}

export default function SentencePuzzle({ chunks, slots, onChange, disabled, accent, onDragStateChange }: Props) {
  const [bankOrder] = useState(() => shuffled(chunks.map((_, i) => i).slice(1)));
  const [drag, setDrag] = useState<{ chunk: number; point: Point } | null>(null);
  const [hover, setHover] = useState<Target>(null);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const root = useRef<View>(null);
  const bank = useRef<View>(null);
  const slotRefs = useRef<(View | null)[]>([]);
  const bounds = useRef<{ root: Point; bank?: Rect; slots: (Rect | undefined)[] }>({ root: { x: 0, y: 0 }, slots: [] });

  const measure = async () => {
    const read = (ref: View | null, apply: (rect: Rect) => void) => new Promise<void>(resolve => {
      if (!ref) { resolve(); return; }
      ref.measureInWindow((x, y, width, height) => { apply({ x, y, width, height }); resolve(); });
    });
    await Promise.all([
      read(root.current, r => { bounds.current.root = r; }),
      read(bank.current, r => { bounds.current.bank = r; }),
      ...slotRefs.current.map((ref, i) => read(ref, r => { bounds.current.slots[i] = r; })),
    ]);
  };
  const hit = (p: Point): Target => {
    const contains = (r?: Rect) => r && p.x >= r.x && p.x <= r.x + r.width && p.y >= r.y && p.y <= r.y + r.height;
    const index = bounds.current.slots.findIndex((r, i) => i > 0 && contains(r));
    return index > 0 ? index : contains(bounds.current.bank) ? "bank" : null;
  };
  const endDrag = () => { setDrag(null); setHover(null); onDragStateChange(false); };
  const piece = (chunk: number, inSlot: boolean) => (
    <Piece text={chunks[chunk]} label={`${inSlot ? "Remove" : "Place"} ${chunks[chunk]}`} disabled={disabled} accent={accent}
      dimmed={drag?.chunk === chunk}
      onTap={() => {
        const target = inSlot ? "bank" : activeSlot ?? slots.findIndex((s, i) => i > 0 && s === null);
        if (target === "bank" || target > 0) onChange(placeChunk(slots, chunk, target));
        setActiveSlot(null);
      }}
      onStart={point => { measure(); setActiveSlot(null); setDrag({ chunk, point }); onDragStateChange(true); }}
      onMove={point => { setDrag({ chunk, point }); setHover(hit(point)); }}
      onDrop={async point => { await measure(); const target = hit(point); if (target !== null) onChange(placeChunk(slots, chunk, target)); endDrag(); }}
      onCancel={endDrag} />
  );

  return (
    <View ref={root} style={styles.board} onLayout={measure}>
      <Text style={styles.label}>YOUR SENTENCE</Text>
      <View style={styles.slots}>
        {slots.map((chunk, i) => (
          <View key={i} ref={ref => { slotRefs.current[i] = ref; }} onLayout={measure}
            style={[styles.slot, (hover === i || activeSlot === i) && { borderColor: accent, backgroundColor: colors.surfaceLight }, i === 0 && styles.fixed]}>
            <Text style={styles.slotNumber}>{i === 0 ? "START" : i + 1}</Text>
            {i === 0 ? <Text style={styles.fixedText}>{chunks[0]}</Text> : chunk !== null ? piece(chunk, true) : (
              <Pressable accessibilityRole="button" accessibilityLabel={`Sentence slot ${i + 1}`} accessibilityState={{ selected: activeSlot === i, disabled }}
                disabled={disabled} onPress={() => setActiveSlot(activeSlot === i ? null : i)} style={styles.emptySlot}>
                <Text style={styles.emptyText}>{activeSlot === i ? "Choose a piece" : "Drop here"}</Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>
      <Text style={styles.preview}>{slots.map(chunk => chunk === null ? "___" : chunks[chunk]).join(" ")}</Text>
      <View ref={bank} onLayout={measure} style={[styles.bank, hover === "bank" && { borderColor: accent }]}>
        <Text style={styles.label}>SENTENCE PIECES</Text>
        <View style={styles.bankPieces}>{bankOrder.filter(i => !slots.includes(i)).map(i => <View key={i}>{piece(i, false)}</View>)}</View>
        {slots.every(s => s !== null) && <Text style={styles.help}>All pieces placed. Drag to swap them, or check your answer.</Text>}
      </View>
      <Text style={styles.help}>Drag pieces into the slots. Swap two pieces by dropping one onto the other. Drag back here to remove, or tap a piece to move it.</Text>
      {!disabled && <Pressable accessibilityRole="button" onPress={() => { onChange(chunks.map((_, i) => i === 0 ? 0 : null)); setActiveSlot(null); }} style={styles.reset}><Text style={{ color: accent }}>Reset puzzle</Text></Pressable>}
      {drag && <View pointerEvents="none" style={[styles.ghost, { borderColor: accent, left: drag.point.x - bounds.current.root.x - 65, top: drag.point.y - bounds.current.root.y - 28 }]}><Text style={styles.pieceText}>{chunks[drag.chunk]}</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { gap: spacing.md, position: "relative" },
  label: { fontSize: 11, fontWeight: "800", letterSpacing: 1.5, color: colors.textSecondary },
  slots: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  slot: { flexGrow: 1, minWidth: 90, maxWidth: "100%", minHeight: 82, borderWidth: 1, borderStyle: "dashed", borderColor: colors.border, borderRadius: 12, padding: 6, justifyContent: "center" },
  fixed: { borderStyle: "solid", backgroundColor: colors.surface },
  slotNumber: { color: colors.textSecondary, fontSize: 10, marginBottom: 4, marginLeft: 4 },
  fixedText: { color: colors.text, fontSize: 17, padding: 8, fontWeight: "600" },
  emptySlot: { flex: 1, minHeight: 44, alignItems: "center", justifyContent: "center" },
  emptyText: { color: colors.textSecondary, fontSize: 13 },
  bank: { padding: spacing.md, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, minHeight: 116, gap: spacing.md },
  bankPieces: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  pieceWrapper: { maxWidth: "100%" },
  piece: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#26364b", borderWidth: 1, borderRadius: 9, padding: 10, minHeight: 46, maxWidth: "100%" },
  pieceText: { color: colors.text, fontSize: 17, fontWeight: "500", flexShrink: 1 },
  grip: { color: colors.textSecondary, fontSize: 18 },
  dimmed: { opacity: 0.4 },
  preview: { color: colors.textSecondary, fontSize: 16, lineHeight: 24 },
  help: { color: colors.textSecondary, fontSize: 13, lineHeight: 20 },
  reset: { alignSelf: "flex-start", paddingVertical: 12, paddingHorizontal: 4 },
  ghost: { position: "absolute", zIndex: 100, elevation: 12, backgroundColor: "#26364b", borderWidth: 2, borderRadius: 10, padding: 14, maxWidth: 270, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
});
