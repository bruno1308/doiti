import React, { useEffect, useRef } from "react";
import { Animated, Image, Platform, StyleSheet, View } from "react-native";

const useNativeDriver = Platform.OS !== "web";

const celebrationImage = require("../assets/images/celebration.webp");
const starImage = require("../assets/images/star.png");

export type CelebrationVariant = "combo3" | "combo5";

interface CelebrationOverlayProps {
  visible: boolean;
  variant?: CelebrationVariant;
  onFinish?: () => void;
}

export default function CelebrationOverlay({
  visible,
  variant = "combo3",
  onFinish,
}: CelebrationOverlayProps) {
  if (variant === "combo5") {
    return <StarBurst visible={visible} onFinish={onFinish} />;
  }

  return <OwlBounce visible={visible} onFinish={onFinish} />;
}

// --- combo3: original owl bounce ---

function OwlBounce({
  visible,
  onFinish,
}: {
  visible: boolean;
  onFinish?: () => void;
}) {
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
        useNativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver,
      }),
    ]);

    let exitAnim: Animated.CompositeAnimation | null = null;

    enterAnim.start(() => {
      exitAnim = Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        delay: 500,
        useNativeDriver,
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

// --- combo5: 5 staggered stars ---

const STAR_OFFSETS = [
  { x: -50, y: -20 },
  { x: -25, y: -40 },
  { x: 0, y: -50 },
  { x: 25, y: -40 },
  { x: 50, y: -20 },
];

function StarBurst({
  visible,
  onFinish,
}: {
  visible: boolean;
  onFinish?: () => void;
}) {
  const stars = useRef(
    STAR_OFFSETS.map(() => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;
  const groupOpacity = useRef(new Animated.Value(1)).current;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!visible) return;

    groupOpacity.setValue(1);
    stars.forEach((s) => {
      s.scale.setValue(0);
      s.opacity.setValue(0);
    });

    // Staggered spring-in for each star
    const enterAnims = stars.map((s, i) =>
      Animated.sequence([
        Animated.delay(i * 80),
        Animated.parallel([
          Animated.spring(s.scale, {
            toValue: 1,
            friction: 4,
            tension: 80,
            useNativeDriver,
          }),
          Animated.timing(s.opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver,
          }),
        ]),
      ])
    );

    const enterAnim = Animated.parallel(enterAnims);

    let exitAnim: Animated.CompositeAnimation | null = null;

    enterAnim.start(() => {
      exitAnim = Animated.timing(groupOpacity, {
        toValue: 0,
        duration: 500,
        delay: 400,
        useNativeDriver,
      });
      exitAnim.start(() => {
        onFinishRef.current?.();
      });
    });

    return () => {
      enterAnim.stop();
      exitAnim?.stop();
    };
  }, [visible, stars, groupOpacity]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View style={[styles.starGroup, { opacity: groupOpacity }]}>
        {stars.map((s, i) => (
          <Animated.View
            key={i}
            style={[
              styles.starWrap,
              {
                transform: [
                  { translateX: STAR_OFFSETS[i].x },
                  { translateY: STAR_OFFSETS[i].y },
                  { scale: s.scale },
                ],
                opacity: s.opacity,
              },
            ]}
          >
            <Image source={starImage} style={styles.starImage} />
          </Animated.View>
        ))}
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
  starGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starWrap: {
    width: 60,
    height: 60,
    marginHorizontal: 2,
  },
  starImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
