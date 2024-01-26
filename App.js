import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import ListItem from "./components/ListItem";

const today = new Date();
let nextId = 0;

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function App() {
  const [Task, setTask] = useState("");
  const [ToDoList, setToDoList] = useState([]);

  const handleAddTask = () => {
    if (Task.trim() !== "") {
      //create new task with unique ID
      const newTask = { id: Math.random(), text: Task };

      //update the task array
      setToDoList([...ToDoList, newTask]);
      //clear input field
      setTask("");
    }
  };

  const renderItem = ({ item }) => (
    <View>
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
    <View style={styles.container}>
      <Text style={styles.h1}>To Do List for {formatDate(today)}</Text>
      <View style={styles.mainContainer}>
        <FlatList
          data={ToDoList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddTask}>
          <Text>Add Task</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Write here"
          value={Task}
          onChangeText={(text) => setTask(text)}
          style={{ height: 28 }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f4e6",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: "",
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  deleteButton: {
    color: "red",
  },
});
