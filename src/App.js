// import logo from './logo.svg';
import "./App.css";
import TodoList from "./components/TodoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]); // array
  const [textInput, setTextInput] = useState(""); // empty string

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddButtonClick = useCallback(
    (e) => {
      //thêm text input vào danh sách todoList
      setTodoList([
        ...todoList,
        { id: v4(), name: textInput, isCompleted: false },
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckButtonClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);
  return (
    <div>
      <h3>Danh sách cần làm</h3>
      <TextField
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddButtonClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></TextField>

      <TodoList todoList={todoList} onCheckButtonClick={onCheckButtonClick} />
    </div>
  );
}

export default App;
