// components/TodoForm.jsx
"use client";

import { useRef } from "react";
import { addTodo } from "@/app/actions/todo-actions";

export default function TodoForm() {
  const formRef = useRef(null);

  async function handleAction(formData) {
    try {
      await addTodo(formData);
      formRef.current?.reset();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <form action={handleAction} ref={formRef} className="space-y-4">
      <input
        name="title"
        placeholder="Was musst du erledigen?"
        required
        autoFocus
        className="
          w-full px-4 py-3 rounded-xl 
          bg-purple-950/60 
          border border-purple-800/50 
          text-purple-50 
          placeholder:text-purple-400/60
          focus:outline-none 
          focus:border-purple-600 
          focus:ring-1 
          focus:ring-purple-600/40
        "
      />
      <button
        type="submit"
        className="
          w-full py-3 px-6 rounded-xl 
          bg-purple-700 hover:bg-purple-600 
          active:bg-purple-800
          text-white font-medium
          transition-colors
        "
      >
        Aufgabe hinzufügen
      </button>
    </form>
  );
}