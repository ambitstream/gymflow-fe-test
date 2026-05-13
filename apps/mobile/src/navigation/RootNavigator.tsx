import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UsersListScreen from "../screens/UsersListScreen";
import UserFormScreen from "../screens/UserFormScreen";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UsersList">
        <Stack.Screen
          name="UsersList"
          component={UsersListScreen}
          options={{ title: "Users" }}
        />

        <Stack.Screen
          name="EditUser"
          component={UserFormScreen}
          options={{ title: "Edit user" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}