// components/TodoItem.jsx
"use client";

import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Platzhalter-Funktionen - später durch echte Server Actions ersetzen
  const handleToggle = () => {
    console.log("Toggle todo:", todo.id, !todo.completed);
    // Hier später: toggleTodoAction(todo.id, todo.completed)
  };

  const handleDelete = () => {
    if (window.confirm("Wirklich löschen?")) {
      console.log("Delete todo:", todo.id);
      // Hier später: deleteTodoAction(todo.id)
    }
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    console.log("Update todo:", todo.id, editTitle.trim());
    // Hier später: updateTodoAction mit FormData
    setIsEditing(false);
  };

  return (
    <div
      className={`
        group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200
        ${
          todo.completed
            ? "bg-purple-950/40 border-purple-900/50"
            : "bg-purple-950/25 border-purple-900/40 hover:bg-purple-950/40 hover:border-purple-800/60"
        }
      `}
    >
      {/* Checkbox selbst gebaut */}
      <div className="pt-1.5">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={`
            w-5 h-5 rounded border-2 
            ${todo.completed 
              ? "bg-purple-700 border-purple-600" 
              : "bg-transparent border-purple-600"}
            accent-purple-700
            cursor-pointer
          `}
        />
      </div>

      {/* Hauptinhalt */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setEditTitle(todo.title);
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="
                flex-1 px-3 py-2 rounded-lg 
                bg-purple-950/70 border border-purple-700/60 
                text-purple-50 placeholder:text-purple-400/60
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-600/40
              "
            />
            <div className="flex gap-2 sm:self-center">
              <button
                onClick={handleSave}
                className="
                  px-4 py-1.5 rounded-lg text-sm font-medium
                  bg-purple-700 hover:bg-purple-600 
                  text-white
                  transition-colors
                "
              >
                Speichern
              </button>
              <button
                onClick={() => {
                  setEditTitle(todo.title);
                  setIsEditing(false);
                }}
                className="
                  px-4 py-1.5 rounded-lg text-sm font-medium
                  text-purple-300 hover:text-purple-100
                  hover:bg-purple-900/40
                  transition-colors
                "
              >
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <>
            <p
              className={`
                text-lg font-medium tracking-tight
                ${todo.completed ? "line-through text-purple-400/70" : "text-purple-50"}
              `}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p className="mt-1 text-sm text-purple-300/70">
                {todo.description}
              </p>
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="
              p-2 rounded-lg 
              text-purple-400 hover:text-purple-200 
              hover:bg-purple-900/40 
              transition-colors
            "
            title="Bearbeiten"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="
              p-2 rounded-lg 
              text-red-400 hover:text-red-300 
              hover:bg-red-950/30 
              transition-colors
            "
            title="Löschen"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}