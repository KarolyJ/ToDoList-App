import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../../Firebase";

export default function DoListPage({ navigation }) {
  const today = new Date();
  const [Task, setTask] = useState("");
  const [ToDoList, setToDoList] = useState([]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const handleAddTask = () => {
    if (Task.trim() !== "") {
      const newTask = { id: Math.random().toString(), text: Task };
      setToDoList([...ToDoList, newTask]);
      setTask("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteFromList(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDeleteFromList = (itemId) => {
    const updatedList = ToDoList.filter((ToDoName) => ToDoName.id !== itemId);
    setToDoList(updatedList);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.header}>To Do List for {formatDate(today)}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={ToDoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }} // Ensures the FlatList fills its container
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write here"
            value={Task}
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
    paddingBottom: 20,
  },
  signOutButton: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
});
