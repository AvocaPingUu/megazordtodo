"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toggleTodoAction, deleteTodoAction, updateTodoAction } from "@/app/actions/todo-actions";

export default function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleSave = async () => {
    if (!title.trim()) return alert("Titel darf nicht leer sein");

    const formData = new FormData();
    formData.append("id", todo.id);
    formData.append("title", title.trim());

    try {
      await updateTodoAction(formData);
      setEditing(false);
    } catch (e) {
      alert("Fehler: " + e.message);
    }
  };

  return (
    <div
      className={`
        group flex items-start gap-3 p-4 rounded-xl border transition-colors
        ${todo.completed 
          ? "bg-purple-950/40 border-purple-900/50" 
          : "bg-purple-950/25 border-purple-900/40 hover:bg-purple-950/35"}
      `}
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
        {editing ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setTitle(todo.title);
                  setEditing(false);
                }
              }}
              autoFocus
              className="flex-1 px-3 py-2 rounded-lg bg-purple-950/70 border border-purple-700/60 text-purple-50 focus:outline-none focus:border-purple-500"
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
                  setTitle(todo.title);
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
            <p className={`text-lg font-medium ${todo.completed ? "line-through text-purple-400/70" : "text-purple-50"}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className="mt-1 text-sm text-purple-300/70">{todo.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Aktionen */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
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
    </div>
  );
}