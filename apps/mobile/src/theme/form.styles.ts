import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const formStyles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    gap: 16
  },
  fieldWrapper: {
    gap: 6,
  },
  fieldHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  placeholder: {
    color: colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
  selectWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
