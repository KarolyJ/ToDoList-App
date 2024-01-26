import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import ListItem from "./components/ListItem";

const today = new Date();
let nextId = 0;

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function App() {
  const [ToDoName, setToDoName] = useState("");
  const [ToDoList, setToDoList] = useState([]);

  const onAddBtnClick = (Text) => {
    if (Text !== "") {
      const newItem = (
        <View>
          <ListItem
            key={nextId}
            ListText={Text}
            delFromList={() => delFromList(nextId)}
          />
          <button
            onClick={() => {
              setToDoList(ToDoList.filter((a) => a.id !== ToDoList.id));
            }}
          ></button>
        </View>
      );
      setToDoList((prevList) => [...prevList, newItem]);
      setToDoName(""); // Clear the input after adding an item
      nextId++; // Increment the nextId for the next item
      console.log(ToDoList);
    } else {
      console.log("write something");
    }
  };

  const delFromList = (itemId) => {
    const updatedList = ToDoList.filter((item) => item.key !== itemId);
    console.log(ToDoList);
    setToDoList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>To Do List for {formatDate(today)}</Text>
      <View style={styles.mainContainer}>{ToDoList}</View>
      <View style={styles.buttomContainer}>
        <Button title="+" onPress={() => onAddBtnClick(ToDoName)} />
        <TextInput
          placeholder="Write here"
          onChange={(e) => setToDoName(e.target.value)}
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
  buttomContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});
