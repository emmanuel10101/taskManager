import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState(''); // State to hold the current task input
  const [tasks, setTasks] = useState([]); // State to hold array of all tasks

  const addTask = () => {
    // Makes sure the task is not empty before adding,
    // then adds new task object with unique ID, text, and completion status
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (id) => {
    // Toggles the completion status of the task with the given ID
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    // Deletes a task by filtering out the task with the matching ID
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Component to render each individual task item
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {/* Checkbox of a task */}
      <TouchableOpacity 
        style={[styles.checkbox, item.completed ? styles.checkedBox : styles.uncheckedBox]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      
      {/* The text of a task with condition styling */}
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      
      {/* Delete button of a task */}
      <Button title="Delete" onPress={() => deleteTask(item.id)} color="#d11a2a" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      
      {/* Input field and button to add new tasks */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      
      {/* List of all tasks */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

// Styling for different components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    paddingHorizontal: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    gap: 10,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  
  // Checkbox styling
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedBox: {
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  checkedBox: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});