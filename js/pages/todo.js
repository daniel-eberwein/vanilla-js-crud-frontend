// IMPORT
import { getTodoById, updateTodo } from "../utils/todos.js";
import { getListById } from "../utils/lists.js";

let todo = {};
let list = {};

// SELECTORS
const todoName = document.querySelector(".todo-name");
const todoList = document.querySelector(".todo-list");
const todoDoneStatus = document.querySelector(".todo-done-status");

// EVENT LISTENERS
window.addEventListener("load", async () => {
  // set titel and heading to selected list name
  const todoId = new URLSearchParams(window.location.search).get("id");

  // get todo by id
  todo = await getTodoById(todoId);

  document.title = todo.text;
  todoName.textContent = todo.text;

  // get list name by list id
  list = await getListById(todo.listName);

  todoList.textContent = list.name;
  todoDoneStatus.checked = todo.done;
});

todoDoneStatus.addEventListener("change", async () => {
  // update element locally
  let updatedTodo = {
    _id: todo._id,
    done: todoDoneStatus.checked,
    listName: todo.listName,
  };

  await updateTodo(updatedTodo);
});
