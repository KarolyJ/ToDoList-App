import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../Firebase";

// function formatDate(date) {
//     return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
//   }

export default function DoListPage({ navigation }) {
  const today = new Date();
  const [Task, setTask] = useState("");
  const [ToDoList, setToDoList] = useState([]);

  const formateDate = ({ date }) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

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
      <Text style={styles.h1}>To Do List for {formateDate(today)}</Text>
      <View>
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
      <View>
        <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
          <Text>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a8f7b",
    justifyContent: "center",
    padding: 20,
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
