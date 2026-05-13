import { useEffect, useMemo } from "react";
import { FlatList, Text, View } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

import { useUserStore } from "../store/userStore";

import Button from "../components/Button";
import UserItem from "../components/UserItem";
import ActivityIndicator from "../components/ActivityIndicator";

import { commonStyles } from "../theme";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "UsersList"
>;

export default function UsersListScreen({
  navigation
}: Props) {
  const users = useUserStore((state) => state.users);
  const loadUsers = useUserStore((state) => state.loadUsers);
  const isLoading = useUserStore((state) => state.isLoading);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [users]
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return (
        <ActivityIndicator />
    );
  }

  return (
    <View style={commonStyles.containerLite}>
      {users.length > 0 ? (
        <FlatList
          data={sortedUsers}
          keyExtractor={item => item.id}
          style={commonStyles.list}
          contentContainerStyle={commonStyles.listContent}
          renderItem={({ item }) => (
            <UserItem user={item} />
          )}
        />
      ) : (
        <View style={commonStyles.container}>
          <Text>No users found.</Text>
        </View>
      )}
      <View style={commonStyles.buttonWrapper}>
        <Button
          onPress={() => navigation.navigate("EditUser", { userId: "new" })}
          title="Add User"
        />
      </View>
    </View>
  );
}