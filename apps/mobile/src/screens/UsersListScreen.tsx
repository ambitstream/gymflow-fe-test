import { useEffect, useMemo } from "react";
import { FlatList, Text, View, ActivityIndicator as Spinner } from "react-native";

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
  const pagination = useUserStore((state) => state.pagination);
  const error = useUserStore((state) => state.error);
  const loadUsers = useUserStore((state) => state.loadUsers);
  const loadNextUsersPage = useUserStore((state) => state.loadNextUsersPage);
  const refreshUsers = useUserStore((state) => state.refreshUsers);
  const isLoading = useUserStore((state) => state.isLoading);
  const isLoadingMore = useUserStore((state) => state.isLoadingMore);

  const { hasNextPage } = pagination;

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  if (isLoading && users.length === 0) {
    return (
        <ActivityIndicator />
    );
  }

  const onEndReached = () => {
    if (!isLoading && !isLoadingMore && users.length > 0 && hasNextPage) {
      void loadNextUsersPage();
    }
  }

  const listEmptyComponent = () => {
    if (!isLoading && users.length === 0) {
      return (
        <Text>{error ?? "No users found."}</Text>
      );
    }
  }

  const listFooterComponent = () => {
    if (isLoadingMore && users?.length > 0) {
      return <Spinner />
    }
  }

  return (
    <View style={commonStyles.containerLite}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        style={commonStyles.list}
        contentContainerStyle={commonStyles.listContent}
        renderItem={({ item }) => (
          <UserItem user={item} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={listFooterComponent}
        onRefresh={() => {
          void refreshUsers();
        }}
        refreshing={isLoading}
      />
      <View style={commonStyles.buttonWrapper}>
        <Button
          onPress={() => navigation.navigate("EditUser", { userId: "new" })}
          title="Add User"
        />
      </View>
    </View>
  );
}
