import { useMachine } from "@xstate/react";
import {
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "../components/Themed";
import { fetchMachine } from "../machines/fetch";
import { fetchUsers } from "../api";
import Colors from "../constants/Colors";
import { userProps } from "../types/index";

export default function UsersScreen({ navigation }: any) {
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    actions: {
      fetchData: (ctx, event) => {
        fetchUsers()
          .then((r) => r)
          .then(
            (res) => {
              sendToFetchMachine({ type: "RESOLVE", results: res });
            },
            (message) => {
              sendToFetchMachine({ type: "REJECT", message });
            }
          );
      },
    },
  });

  const renderUser = (item: userProps) => {
    return (
      <Pressable
        style={styles.user}
        onPress={() => navigation.navigate("User", { user: item })}
      >
        <Text style={styles.userName}>
          {item.id}. {item.username}
        </Text>
      </Pressable>
    );
  };

  if (fetchState.value === "idle") sendToFetchMachine({ type: "FETCH" });

  return (
    <View style={styles.container}>
      {fetchState.value === "failed" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Something went wrong!</Text>
          <Pressable onPress={() => sendToFetchMachine({ type: "FETCH" })}>
            <Text style={styles.errorButton}>Click to Refresh</Text>
          </Pressable>
        </View>
      )}
      {fetchState.value === "pending" && (
        <ActivityIndicator size="large" color="#FFFFFF" />
      )}
      {fetchState.value === "successful" && (
        <FlatList
          data={fetchState.context.results}
          renderItem={({ item }) => renderUser(item)}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
    paddingBottom: 32,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  errorButton: {
    fontSize: 18,
    padding: 20,
    color: Colors.light.text,
    opacity: 0.7,
  },
  user: {
    padding: 10,
    width: "auto",
    backgroundColor: Colors.light.background,
    marginBottom: 8,
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
});
