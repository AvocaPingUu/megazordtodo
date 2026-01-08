// app/actions/todo-actions.js
"use server";

import { revalidatePath } from "next/cache";
import * as todos from "@/lib/todos";

export async function addTodo(formData) { // add todo action
  const title = formData.get("title")?.trim(); // get title
  const description = formData.get("description")?.trim() || ""; // get description

  if (!title) throw new Error("Titel erforderlich"); // validate title

  await todos.createTodo(title, description); // create todo
  revalidatePath("/"); 
}

export async function updateStatusAction(formData) { 
  const id = formData.get("id"); // get ID
  const status = formData.get("status"); // get new status

  if (!id || !status) throw new Error("Fehlende Daten"); // validate data

  await todos.updateStatus(id, status); // update status
  revalidatePath("/");
}



export async function updateTodoAction(formData) {
  const id = formData.get("id"); // get ID
  const title = formData.get("title")?.trim();  // get title
  const description = formData.get("description")?.trim();  // get description

  if (!id || !title) throw new Error("Fehlende Daten"); // validate data

  await todos.updateTodo(id, { // update todo
    title, 
    description  
  });
  revalidatePath("/"); 
}

export async function deleteTodoAction(id) {
  await todos.deleteTodo(id); // delete todo
  revalidatePath("/");
}