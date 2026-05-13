import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerLite: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  link: {
    color: colors.primary,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  buttonWrapper: {
    gap: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonWrapperLite: {
    gap: 16,
    padding: 16,
    marginBottom: 16,
  },
});
