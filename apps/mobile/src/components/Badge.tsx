import { StyleSheet, View, Text } from "react-native";
import { colors } from "../theme";

type BadgeProps = {
  title: string;
};

export default function Badge({
  title
}: BadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  text: {
    fontSize: 12
  }
});