import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import SingleTodo from "./components/SingleTodo";
import AsyncStorage from "@react-native-async-storage/async-storage";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  }
  useEffect(() => {
    fetchTodos();
  }, [])
  
  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };
  // console.log(todos)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Todo"
          style={styles.input}
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView>
        {todos.map((item) => {
          <Text key={item.id}>{item.text}</Text>
        })}
      </ScrollView> */}

      <View style={{width: '100%', marginTop: 10 }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <SingleTodo todo={item} setTodos={setTodos} todos={todos} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
});
