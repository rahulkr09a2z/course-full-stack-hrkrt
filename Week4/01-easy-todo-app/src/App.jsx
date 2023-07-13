import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ListItem from "./components/listItem";

const BASE_URL = "http://localhost:8080";
const TODO_URL = `${BASE_URL}/todos`;
const TODO_STATE_KEY = {
  Title: "title",
  Description: "description",
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    [TODO_STATE_KEY.Title]: "",
    [TODO_STATE_KEY.Description]: "",
  });
  const [editId, setEditId] = useState("");

  const getTodos = async () => {
    const allTodos = await axios.get(TODO_URL);
    setTodos(allTodos.data || []);
  };
  const addTodo = async () => {
    let tempNewTodo = { ...newTodo };
    await axios.post(TODO_URL, tempNewTodo).then((res) => {
      let newAllTodos = [...todos, { id: res.data.id, ...tempNewTodo }];
      setTodos(newAllTodos);
      resetTodoState();
    });
  };

  const updateTodo = async () => {
    await axios.put(`${TODO_URL}/${editId}`, newTodo).then((_res) => {
      let tempTodos = [...todos];
      const targetIndex = todos.findIndex((todo) => todo.id === editId);
      const { title, description } = newTodo;
      tempTodos[targetIndex].title = title;
      tempTodos[targetIndex].description = description;
      resetEditHandler();
    });
  };
  const deleteTodo = async (todoId) => {
    await axios.delete(`${TODO_URL}/${todoId}`).then((_res) => {
      let tempNewTodos = [...todos];
      let newTodosArr = tempNewTodos.filter((todo) => {
        if (todo.id !== todoId) return todo;
      });
      setTodos(newTodosArr);
    });
  };
  const resetTodoState = () => {
    setNewTodo({
      [TODO_STATE_KEY.Title]: "",
      [TODO_STATE_KEY.Description]: "",
    });
  };

  const newTodoChangeHandler = (key, value) => {
    setNewTodo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const editTodoHandler = async (recvId) => {
    setEditId(recvId);
    const editItem = todos.find((todo) => todo.id === recvId);
    newTodoChangeHandler(TODO_STATE_KEY.Title, editItem.title);
    newTodoChangeHandler(TODO_STATE_KEY.Description, editItem.description);
  };
  const resetEditHandler = () => {
    setEditId("");
    resetTodoState();
  };
  
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <>
          <input
            type="text"
            placeholder="title"
            value={newTodo.title}
            onChange={(event) =>
              newTodoChangeHandler(TODO_STATE_KEY.Title, event.target.value)
            }
          />
          <br />
          <input
            type="text"
            placeholder="description"
            value={newTodo.description}
            onChange={(event) =>
              newTodoChangeHandler(
                TODO_STATE_KEY.Description,
                event.target.value
              )
            }
          />
          <br />
          <button onClick={editId ? updateTodo : addTodo}>
            {editId ? "Save" : "Add"}
          </button>
          {editId && <button onClick={resetEditHandler}>Cancel</button>}
        </>
      </div>
      {todos.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            todo={todo}
            deleteHandler={deleteTodo}
            editHandler={editTodoHandler}
          />
        );
      })}
    </>
  );
}

export default App;
