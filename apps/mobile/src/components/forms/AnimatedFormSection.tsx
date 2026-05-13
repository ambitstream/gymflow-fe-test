import { useEffect } from "react";
import { type PropsWithChildren } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type Props = PropsWithChildren<{
  index: number;
}>;

export default function AnimatedFormSection({ index, children }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    const BASE_DELAY = 250;
    const delay = BASE_DELAY + index * 90;

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
