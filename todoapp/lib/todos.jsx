// src/lib/todos.js
let todos = [];

export async function getTodos() {
  return [...todos];
}

export async function createTodo(title, description = "") {
  const newTodo = {
    id: crypto.randomUUID(), // unique ID
    title,
    description,
    status: "Nicht erledigt", 
    
  };
  todos.push(newTodo); // add to list
  return newTodo; 
}

export async function updateStatus(id, newStatus) { // update status
  const todo = todos.find(t => t.id === id); // find todo by ID
  if (todo) {
    todo.status = newStatus; // update status
  }
}

export async function updateTodo(id, { title, description }) { // update todo details
  const todo = todos.find(t => t.id === id); // find todo by ID
  if (todo) {
    if (title !== undefined) todo.title = title; // update title
    if (description !== undefined) todo.description = description; // update description
  }
}

export async function deleteTodo(id) { // delete todo
  todos = todos.filter(t => t.id !== id); // remove from list
}