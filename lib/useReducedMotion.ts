import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export default function useReducedMotion() {
  // Stay still until the OS/browser preference has been read.
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", value => {
      changed = true;
      if (active) setReduced(value);
    });
    AccessibilityInfo.isReduceMotionEnabled().then(value => {
      if (active && !changed) setReduced(value);
    }).catch(() => {});
    return () => { active = false; subscription?.remove(); };
  }, []);
  return reduced;
}
