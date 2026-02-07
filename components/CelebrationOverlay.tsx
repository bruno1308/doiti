import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const celebrationImage = require("../assets/images/celebration.webp");

interface CelebrationOverlayProps {
  visible: boolean;
  onFinish?: () => void;
}

export default function CelebrationOverlay({
  visible,
  onFinish,
}: CelebrationOverlayProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!visible) return;

    scale.setValue(0.3);
    opacity.setValue(0);

    const enterAnim = Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    let exitAnim: Animated.CompositeAnimation | null = null;

    enterAnim.start(() => {
      exitAnim = Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        delay: 500,
        useNativeDriver: true,
      });
      exitAnim.start(() => {
        onFinishRef.current?.();
      });
    });

    return () => {
      enterAnim.stop();
      exitAnim?.stop();
    };
  }, [visible, scale, opacity]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Image source={celebrationImage} style={styles.image} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  imageContainer: {
    width: 160,
    height: 160,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
