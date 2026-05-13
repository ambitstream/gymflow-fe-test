import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

type ButtonVariant = "primary" | "danger";
type ButtonSize = "large" | "small";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  disabled?: boolean;
  isChip?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "large",
  active = false,
  disabled = false,
  isChip = false,
}: ButtonProps) {
  const isInactiveChip = isChip && !active;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        styles[size],
        isInactiveChip ? styles.chip : styles[variant],
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          isInactiveChip ? styles.chipText : styles.lightText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  chip: {
    backgroundColor: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  largeText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  lightText: {
    color: colors.white,
  },
  chipText: {
    color: colors.text,
  },
});