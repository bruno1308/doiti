import React from "react";
import OverallPractice from "../../components/OverallPractice";
import { focusedPractice } from "../../data/focused-practice";

export default function PracticeScreen() {
  return <OverallPractice config={focusedPractice["possessives"]} />;
}
