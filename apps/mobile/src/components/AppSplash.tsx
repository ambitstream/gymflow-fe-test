import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type Props = {
  onFinish: () => void;
};

export default function AppSplash({ onFinish }: Props) {
  const cubeScale = useRef(new Animated.Value(10)).current;
  const cubeRotate = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;

  const rotate = cubeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-45deg", "0deg"],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(cubeScale, {
          toValue: 1,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        }),
        Animated.timing(cubeRotate, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.delay(600),

      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, [cubeScale, cubeRotate, textOpacity, splashOpacity, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: splashOpacity }]}>
      <Animated.View
        style={[
          styles.logo,
          {
            transform: [{ scale: cubeScale }, { rotate }],
          },
        ]}
      >
        <Animated.Text style={[styles.logoText, { opacity: textOpacity }]}>
          GF
        </Animated.Text>
      </Animated.View>

      <Text style={styles.title}>Gymflow</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primary,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
});