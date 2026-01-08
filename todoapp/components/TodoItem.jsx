// components/TodoItem.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { toggleTodoAction, deleteTodoAction, updateTodoAction, updateStatusAction } from "@/app/actions/todo-actions";

export default function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleStatusChange = async (e) => {
    const formData = new FormData();
    formData.append("id", todo.id);
    formData.append("status", e.target.value);
    await updateStatusAction(formData);
  };

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
      alert("Fehler beim Speichern: " + e.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`
        group flex items-start gap-3 p-5 rounded-xl border transition-all duration-200
        ${todo.status === "Erledigt" 
          ? "bg-green-950/40 border-green-800/50" 
          : "bg-purple-950/35 border-purple-800/50 hover:bg-purple-950/45"}
      `}
    >
      {/* Status-Dropdown */}
      <div className="mt-1.5 relative">
        <select
          value={todo.status}
          onChange={handleStatusChange}
          className={`
            appearance-none
            px-4 py-2 pr-10 rounded-lg text-sm font-medium
            bg-purple-900/90 border border-purple-600
            text-white cursor-pointer
            focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40
            hover:bg-purple-800/90 hover:border-purple-500
            transition-all duration-200
            shadow-sm
          `}
        >
          <option value="Nicht erledigt" className="bg-purple-950 text-red-300">Nicht erledigt</option>
          <option value="In Bearbeitung" className="bg-purple-950 text-yellow-300">In Bearbeitung</option>
          <option value="Erledigt" className="bg-purple-950 text-green-300">Erledigt</option>
        </select>

        {/* Custom Pfeil – hochkontrast */}
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* Inhalt */}
      <div className="flex-1 min-w-0">
        {editing ? (
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
                text-purple-50 placeholder:text-purple-400/60
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-600/40
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
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-600/40
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
        ) : (
          <div>
            <p className={`text-lg font-medium ${todo.status === "Erledigt" ? "line-through text-purple-400/70" : "text-purple-50"}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className="mt-2 text-sm text-purple-300/80 leading-relaxed">
                {todo.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Aktionen */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded-lg text-purple-400 hover:text-purple-200 hover:bg-purple-900/40 transition-colors"
            title="Bearbeiten"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => {
              if (confirm("Wirklich löschen?")) deleteTodoAction(todo.id);
            }}
            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
            title="Löschen"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </motion.div>
  );
}