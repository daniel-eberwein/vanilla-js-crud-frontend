// IMPORTS
import { getAllLists, createList, deleteList } from "../utils/lists.js";

// GLOBAL VARIABLES
let lists = [];

// SELECTORS
const todoListList = document.querySelector(".todo-list-list");
const addListInput = document.querySelector("#add-list-input");
const addListBtn = document.querySelector("#add-list-btn");

// FUNCTIONS
// render the lists on the screen
const renderLists = async () => {
  lists = await getAllLists();
  removeChildren(todoListList);
  lists.forEach((list) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = `/liste.html?id=${list._id}`;
    a.innerText = list.name;
    li.appendChild(a);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.classList.add("delete-btn");
    // event listener for deleting lists
    deleteBtn.addEventListener("click", async () => {
      // delete from db
      const deleted = await deleteList(list._id);

      // when successfull remove it from local list
      await renderLists();
    });

    li.appendChild(deleteBtn);
    todoListList.appendChild(li);
  });
};

// create a new list element and add it to db
const createNewList = async (event) => {
  event.preventDefault();
  if (addListInput.value != "") {
    // create list at db via api
    const reqBody = {
      name: addListInput.value,
    };
    await createList(reqBody);

    addListInput.value = "";
    await renderLists();
  } else {
    alert("List Name must not be empty!");
  }
};

const removeChildren = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

// EVENT LISTENERS

window.addEventListener("load", async () => {
  renderLists();
});

addListBtn.addEventListener("click", createNewList);
