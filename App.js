import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import ListItem from './components/ListItem';

const today = new Date();
let nextId = 0;

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}


export default function App() {
  const[ToDoName, setToDoName] = useState('');
  const [ToDoList, setToDoList] = useState([]);

  const onAddBtnClick = (Text) => {
    const newItem = <ListItem key={ToDoList.length} ListText={Text} delFromList={delFromlist}/>;
    setToDoList([...ToDoList, newItem]);
  }

  const delFromlist = () => {
    setToDoList(ToDoList.filter(a => a.key !== ToDoList.key))
  }

  return (
    <View style={styles.container}>
      <h1>To Do List for {formatDate(today)}</h1>
      <View style={styles.mainContainer}>
        {ToDoList}
      </View>
        <View style={styles.buttomContainer}>
          <Button title='+' onPress={() => onAddBtnClick(ToDoName)}/>
          <TextInput
            placeholder="useless placeholder"
            onChange={e => setToDoName(e.target.value)}
          />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
  },
  buttomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
