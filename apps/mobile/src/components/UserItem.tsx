import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { type User, USER_ROLE_LABELS_MAP } from "@gymflow/shared";
import Badge from "./Badge";
import { colors } from "../theme";

type Props = {
  user: User;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UserItem({ user }: Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
      <Pressable
        onPress={() => navigation.navigate("EditUser", { userId: user.id })}
        style={styles.card}
      >
        <View style={styles.column}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.date}>{user.dateOfBirth || 'No birthday'}</Text>
        </View>
        <Badge title={USER_ROLE_LABELS_MAP[user.role]} />
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  }
});
