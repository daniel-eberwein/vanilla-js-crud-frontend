// CONSTS
const API_URL = "http://localhost:3000/api/todoLists";

// retrieve all lists from api
export const getAllLists = async () => {
  const lists = await fetch(API_URL);
  return await lists.json();
};

export const getListById = async (id) => {
  const list = await fetch(`${API_URL}/${id}`);
  return await list.json();
};

export const createList = async (reqBody) => {
  const newList = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  return newList;
};

export const updateList = async (list) => {
  const updatedList = await fetch(`${API_URL}/${list._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  return updatedList;
};

export const deleteList = async (id) => {
  const deleted = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return deleted;
};
