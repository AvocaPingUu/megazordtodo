// components/TodoItem.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { toggleTodoAction, deleteTodoAction, updateTodoAction } from "@/app/actions/todo-actions";

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.3 } },
};

const editVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: "easeOut" } },
};

export default function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleSave = async () => {
    if (!editTitle.trim()) return alert("Titel darf nicht leer sein");

    const formData = new FormData();
    formData.append("id", todo.id);
    formData.append("title", editTitle.trim());
    formData.append("description", editDescription.trim());

    try {
      await updateTodoAction(formData);
      setEditing(false);
    } catch (e) {
      alert("Fehler: " + e.message);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`
        flex items-start gap-3 p-5 rounded-xl
        border border-purple-800/50
        transition-all duration-200
        ${todo.completed 
          ? "bg-purple-950/45" 
          : "bg-purple-950/35 hover:bg-purple-950/45"}
      `}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoAction(todo.id)}
        className={`
          w-5 h-5 mt-1.5 rounded border-2 cursor-pointer
          ${todo.completed ? "bg-purple-700 border-purple-600" : "bg-transparent border-purple-600"}
          accent-purple-700
        `}
      />

      {/* Inhalt */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`text-lg font-medium ${todo.completed ? "line-through text-purple-400/70" : "text-purple-50"}`}>
                {todo.title}
              </p>
              {todo.description && (
                <p className="mt-2 text-sm text-purple-300/80 leading-relaxed">
                  {todo.description}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              variants={editVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="space-y-4">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") {
                      setEditTitle(todo.title);
                      setEditDescription(todo.description || "");
                      setEditing(false);
                    }
                  }}
                  autoFocus
                  className="
                    w-full px-3 py-2 rounded-lg 
                    bg-purple-950/70 border border-purple-700/60 
                    text-purple-50 focus:outline-none focus:border-purple-500
                  "
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Beschreibung bearbeiten..."
                  rows={3}
                  className="
                    w-full px-3 py-2 rounded-lg 
                    bg-purple-950/70 border border-purple-700/60 
                    text-purple-50 placeholder:text-purple-400/60
                    focus:outline-none focus:border-purple-500
                  "
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-1.5 bg-purple-700 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => {
                      setEditTitle(todo.title);
                      setEditDescription(todo.description || "");
                      setEditing(false);
                    }}
                    className="px-4 py-1.5 text-purple-300 hover:text-purple-100 hover:bg-purple-900/40 text-sm rounded-lg transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aktionen – mit Hover-Skala */}
      {!editing && (
        <motion.div
          className="flex items-center gap-1 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setEditing(true)}
            className="p-2 rounded-lg text-purple-400 hover:text-purple-200 hover:bg-purple-900/40 transition-colors"
            title="Bearbeiten"
          >
            <Pencil size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (confirm("Wirklich löschen?")) deleteTodoAction(todo.id);
            }}
            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
            title="Löschen"
          >
            <Trash2 size={18} />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}