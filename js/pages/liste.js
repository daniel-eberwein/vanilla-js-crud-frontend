import { getListById, updateList } from "../utils/lists.js";
import { getAllTodos, createTodo, deleteTodo } from "../utils/todos.js";

// GLOBAL VARIABLES
let liste = {};
let todos = [];

// SELECTORS
const heading = document.querySelector(".heading");
const todoList = document.querySelector(".todo-list");
const newTodoName = document.querySelector("#new-todo-name");
const addTodoBtn = document.querySelector("#add-todo-btn");
const changeListNameBtn = document.querySelector("#change-list-name-btn");
const newListNameInput = document.querySelector("#new-list-name");
const saveNewListNameBtn = document.querySelector("#save-new-list-name-btn");

// FUNCTIONS
const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const extractListId = async () => {
  // set titel and heading to selected list name
  const listId = new URLSearchParams(window.location.search).get("id");
  liste = await getListById(listId);
  document.title = liste.name;
  heading.textContent = liste.name;
  return liste;
};

const getTodosFromList = async (liste) => {
  // get all todos
  todos = await getAllTodos();
  // filter todos by list
  const todosToShow = todos.filter((todo) => {
    return todo.listName === liste._id;
  });
  return todosToShow;
};

const createNewToDo = async (event) => {
  event.preventDefault();
  if (newTodoName.value != "") {
    let newTodo = {
      text: newTodoName.value,
      listName: new URLSearchParams(window.location.search).get("id"),
    };
    await createTodo(newTodo);
    newTodoName.value = "";
    initView();
  } else {
    alert("ToDo text must not be empty");
  }
};

const renderTodos = async (todosToShow) => {
  removeChildren(todoList);

  // display todos of list
  todosToShow.forEach((todo, index) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = todo.text;
    a.href = `/todo.html?id=${todo._id}`;

    if (todo.done) {
      a.classList.add("done");
    }

    li.appendChild(a);

    let deleteBtn = document.createElement("button");
    deleteBtn.dataset.todoId = todo._id;
    deleteBtn.textContent = "Löschen";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", async (event) => {
      await deleteTodo(event.target.dataset.todoId);
      initView();
    });

    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
};

const initView = async () => {
  let liste = await extractListId();
  let todosToShow = await getTodosFromList(liste);
  renderTodos(todosToShow);
};

// EVENT LISTENERS
window.addEventListener("load", async () => {
  await initView();
});

addTodoBtn.addEventListener("click", createNewToDo);
changeListNameBtn.addEventListener("click", () => {
  newListNameInput.classList.toggle("visible");
  saveNewListNameBtn.classList.toggle("visible");
  if (changeListNameBtn.textContent === "Name ändern") {
    changeListNameBtn.textContent = "Abbrechen";
  } else {
    changeListNameBtn.textContent = "Name ändern";
  }
});

saveNewListNameBtn.addEventListener("click", async () => {
  newListNameInput.classList.toggle("visible");
  saveNewListNameBtn.classList.toggle("visible");
  if (changeListNameBtn.textContent === "Name ändern") {
    changeListNameBtn.textContent = "Abbrechen";
  } else {
    changeListNameBtn.textContent = "Name ändern";
  }

  let newList = {
    _id: liste._id,
    name: newListNameInput.value,
  };
  const updatedList = await updateList(newList);
  heading.textContent = newList.name;
});
