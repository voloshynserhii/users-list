import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import Users from "../screens/Users";
import User from "../screens/User";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Users"
        component={Users}
        options={{ title: "Users List" }}
      />
      <Stack.Screen name="User" component={User} options={{ title: "User" }} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "404!" }}
      />
    </Stack.Navigator>
  );
}