// CONSTS
const API_URL = "http://localhost:3000/api/todos";

// retrieve all lists from api
export const getAllTodos = async () => {
  const todos = await fetch(API_URL);
  return await todos.json();
};

export const getTodoById = async (id) => {
  const todo = await fetch(`${API_URL}/${id}`);
  return await todo.json();
};

export const createTodo = async (reqBody) => {
  const newTodo = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return newTodo;
};

export const updateTodo = async (todo) => {
  const updatedTodo = await fetch(`${API_URL}/${todo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return updatedTodo;
};

export const deleteTodo = async (id) => {
  const deleted = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return deleted;
};
