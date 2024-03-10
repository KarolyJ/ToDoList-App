import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../../Firebase";
import { FIREBASE_DB } from "../../Firebase";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import CostumMenu from "../components/CostumMenu";

//TODO fix  the position of the pop up menu

export default function DoListPage({ navigation }) {
  const today = new Date();
  const [task, setTask] = useState("");
  const [todolist, setTodolist] = useState([]);
  const auth = FIREBASE_AUTH;

  const queryUser = query(
    collection(FIREBASE_DB, "accounts"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("timestamp", "asc")
  );

  useEffect(() => {
    onSnapshot(
      queryUser,
      (snapshot) => {
        setTodolist(
          snapshot.docs.map((doc) => ({
            item: doc.data(),
            id: doc.id,
          }))
        );
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, [task]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      addDoc(collection(FIREBASE_DB, "accounts"), {
        todos: task,
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setTask("");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.item.todos}</Text>
        <TouchableOpacity
          onPress={() => deleteDoc(doc(FIREBASE_DB, "accounts", item.id))}
        >
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
        <Text style={styles.header}>To Do List for {formatDate(today)}</Text>
      </View>
      <CostumMenu />

      <View style={styles.listContainer}>
        <FlatList
          data={todolist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }} // Ensures the FlatList fills its container
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write here"
            value={task}
            onChangeText={(text) => setTask(text)}
            style={{ flex: 1, marginRight: 20 }}
          />
          <Pressable onPress={handleAddTask}>
            <Text>Add Task</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
      {/* <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
        <Text style={styles.signOutButton}>SIGN OUT</Text>
      </TouchableOpacity> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a8f7b",
    padding: 20,
    paddingTop: "25%",
  },
  listContainer: {
    flex: 1, // Ensure the list container takes remaining space after the header and button container
    top: -300,
  },
  headContainer: {
    flexDirection: "row", // Add flexDirection
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  deleteButton: {
    color: "red",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 5,
    marginVertical: -5,
    marginHorizontal: 10,
  },
  signOutButton: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
});
