import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const LOGO = require('../assets/metro-x-bus.png');
const LOGO_ASPECT = 310 / 564;
const DURATION = 18000;

/**
 * Three watermarks, staggered on the same diagonal so about 3 stay on screen.
 */
const PHASES = [0, 1 / 3, 2 / 3];

function DriftingLogo({ phase, width, height }) {
  const progress = useRef(new Animated.Value(0)).current;
  const logoW = Math.min(168, width * 0.42);
  const logoH = logoW * LOGO_ASPECT;

  useEffect(() => {
    if (!width || !height) return undefined;

    progress.setValue(phase);
    const finishFirstPass = Animated.timing(progress, {
      toValue: 1,
      duration: DURATION * (1 - phase),
      easing: Easing.linear,
      useNativeDriver: true,
    });
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: DURATION,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    const animation = Animated.sequence([finishFirstPass, loop]);
    animation.start();
    return () => animation.stop();
  }, [height, phase, progress, width]);

  // Diagonal: bottom-left → top-right
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.72],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(height + logoH)],
  });

  return (
    <Animated.Image
      source={LOGO}
      resizeMode="contain"
      style={[
        styles.logo,
        {
          left: -logoW * 0.15,
          top: height - logoH * 0.35,
          width: logoW,
          height: logoH,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
}

/**
 * Original-photo X+bus watermarks drifting diagonally bottom → top.
 * Decorative only — not a real validation mark.
 */
export default function MovingTransitIcons() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <View
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
      }}
    >
      {size.width > 0 &&
        PHASES.map((phase) => (
          <DriftingLogo
            key={String(phase)}
            phase={phase}
            width={size.width}
            height={size.height}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    opacity: 0.48,
  },
});
