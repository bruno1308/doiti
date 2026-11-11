import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";
import type { Correction, Criterion, SpeakingReport, WritingReport } from "../../lib/sds/report";
import { levelLabels } from "../../lib/sds/types";
import { LevelBadge, ui } from "./ui";

function CriterionRow({ name, value }: { name: string; value: Criterion }) {
  return <View style={styles.criterion}>
    <Ionicons name={value.met ? "checkmark-circle" : "close-circle"} size={20} color={value.met ? colors.success : colors.error} accessibilityLabel={value.met ? "met" : "not met"} />
    <View style={{ flex: 1, gap: 2 }}><Text style={styles.criterionName}>{name}</Text><Text style={ui.help}>{value.comment}</Text></View>
  </View>;
}
function Corrections({ items, verb }: { items: Correction[]; verb: string }) {
  if (!items.length) return null;
  return <View style={ui.card}>
    <Text style={ui.heading}>Corrections</Text>
    {items.map((item, i) => <View key={i} style={styles.correction}>
      <Text style={ui.label}>{verb}</Text><Text style={[ui.german, styles.said]}>{item.said}</Text>
      <Text style={ui.label}>Better</Text><Text style={[ui.german, { fontWeight: "600" }]}>{item.better}</Text>
      <Text style={ui.help}>{item.why}</Text>
    </View>)}
  </View>;
}

export function SpeakingReportView({ report }: { report: SpeakingReport }) {
  const met = Object.values(report.criteria).filter(value => value.met).length;
  return <>
    <View style={[ui.card, ui.row]}><LevelBadge large level={report.level} /><Text style={[ui.body, { flex: 1 }]}>{report.summary}</Text></View>
    <View style={ui.card}>
      <Text style={ui.heading}>Tasks</Text>
      {report.taskFulfilment.map((task, i) => <CriterionRow key={i} name={`${levelLabels[task.level]} · ${task.task}`} value={{ met: task.fulfilled, comment: task.comment }} />)}
    </View>
    <View style={ui.card}>
      <Text style={ui.heading}>Criteria · {met} of 4 met</Text>
      <Text style={ui.help}>A level needs the task fulfilled and three of the four criteria.</Text>
      <CriterionRow name="Wortschatz" value={report.criteria.wortschatz} />
      <CriterionRow name="Korrektheit" value={report.criteria.korrektheit} />
      <CriterionRow name="Flüssigkeit" value={report.criteria.fluessigkeit} />
      <CriterionRow name="Kohärenz & Kohäsion" value={report.criteria.kohaerenz} />
    </View>
    {report.strengths.length > 0 && <View style={ui.card}><Text style={ui.heading}>What went well</Text>{report.strengths.map((text, i) => <Text key={i} style={ui.body}>• {text}</Text>)}</View>}
    {report.priorities.length > 0 && <View style={ui.card}>
      <Text style={ui.heading}>Work on next</Text>
      {report.priorities.map((item, i) => <View key={i} style={styles.correction}>
        <Text style={styles.criterionName}>{i + 1}. {item.title}</Text><Text style={ui.body}>{item.advice}</Text><Text style={[ui.german, { fontStyle: "italic" }]}>{item.example}</Text>
      </View>)}
    </View>}
    <Corrections items={report.corrections} verb="You said" />
    {!!report.nextLevel && <View style={ui.card}><Text style={ui.heading}>For the next level</Text><Text style={ui.body}>{report.nextLevel}</Text></View>}
  </>;
}

export function WritingReportView({ report }: { report: WritingReport }) {
  return <>
    <View style={[ui.card, ui.row]}><LevelBadge large level={report.level} /><Text style={[ui.body, { flex: 1 }]}>{report.summary}</Text></View>
    {report.tasks.map(task => <View key={task.taskId} style={{ gap: 14 }}>
      <View style={ui.card}>
        <View style={ui.row}><LevelBadge level={task.level} /><Text style={[ui.heading, { flex: 1 }]}>{task.reached ? "Reached" : "Not reached"}</Text></View>
        <CriterionRow name="Task fulfilled" value={{ met: task.taskFulfilled, comment: task.missingPoints.length ? `Missing: ${task.missingPoints.join("; ")}` : task.comment }} />
        <CriterionRow name="Kohärenz & Kohäsion" value={task.criteria.kohaerenz} />
        <CriterionRow name="Wortschatz" value={task.criteria.wortschatz} />
        <CriterionRow name="Grammatische Korrektheit" value={task.criteria.korrektheit} />
        {task.missingPoints.length > 0 && <Text style={ui.help}>{task.comment}</Text>}
      </View>
      <Corrections items={task.corrections} verb="You wrote" />
    </View>)}
    {report.priorities.length > 0 && <View style={ui.card}><Text style={ui.heading}>Work on next</Text>{report.priorities.map((text, i) => <Text key={i} style={ui.body}>{i + 1}. {text}</Text>)}</View>}
  </>;
}

const styles = StyleSheet.create({
  criterion: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  criterionName: { fontSize: 15, lineHeight: 21, fontWeight: "700", color: colors.text },
  correction: { gap: 3, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  said: { color: colors.error },
});
