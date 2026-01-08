// src/lib/todos.js
let todos = [];

export async function getTodos() {
  return [...todos];
}

export async function createTodo(title, description = "") {
  const newTodo = {
    id: crypto.randomUUID(),
    title,
    description,
    status: "Nicht erledigt", 
    
  };
  todos.push(newTodo);
  return newTodo;
}

export async function updateStatus(id, newStatus) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.status = newStatus;
  }
}

export async function updateTodo(id, { title, description }) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
  }
}

export async function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
}