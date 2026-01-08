// components/TodoForm.jsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
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
    <motion.form
      action={handleAction}
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <input
        name="title"
        placeholder="Titel*"
        required
        autoFocus
        className="
          w-full px-4 py-3 rounded-xl 
          bg-purple-950/60 border border-purple-800/50 
          text-purple-50 placeholder:text-purple-400/60
          focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40
        "
      />

      <textarea
        name="description"
        placeholder="Beschreibung (optional)"
        rows={2}
        className="
          w-full px-4 py-3 rounded-xl 
          bg-purple-950/60 border border-purple-800/50 
          text-purple-50 placeholder:text-purple-400/60
          focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40
        "
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="
          w-full py-3 px-6 rounded-xl 
          bg-purple-700 hover:bg-purple-600 active:bg-purple-800
          text-white font-medium transition-colors
        "
      >
        Aufgabe hinzufügen
      </motion.button>
    </motion.form>
  );
}