"use server";

import { revalidatePath } from "next/cache";
import * as todos from "@/lib/todos";

export async function addTodo(formData) {
  const title = formData.get("title")?.trim();
  const description = formData.get("description")?.trim() || "";

  if (!title) throw new Error("Titel erforderlich");

  await todos.createTodo(title, description);
  revalidatePath("/");
}

export async function toggleTodoAction(id,) {
    await todos.toggleTodo(id);
    revalidatePath("/");
}

export async function updateTodoAction(formData) {
    const id = formData.get("id");
    const title = formData.get("title")?.trim();
    
    if (!id || !title) throw new Error("Ungültige Daten");

    await todos.updateTodo(id, {title});
    revalidatePath("/");
}

export async function deleteTodoAction(id) {
    await todos.deleteTodo(id);
    revalidatePath("/");
}
