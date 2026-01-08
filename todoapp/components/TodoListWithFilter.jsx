// components/TodoListWithFilter.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TodoItem from "@/components/TodoItem";

export default function TodoListWithFilter({ initialTodos }) {
  const [filter, setFilter] = useState("Alle"); // initial filter state

  const filteredTodos = initialTodos.filter(todo => {
    if (filter === "Alle") return true; // show all todos
    return todo.status === filter; // filter by status
  });

  return (
    <>
      {/* Filter-Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // update filter state
          className="
            appearance-none px-4 py-2 pr-10 rounded-lg text-sm font-medium
            bg-purple-900/80 border border-purple-700/60 text-purple-100
            focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40
            hover:bg-purple-800/80 transition-all duration-200
            shadow-sm cursor-pointer
          "
        >
          <option value="Alle">Alle Aufgaben</option>
          <option value="Nicht erledigt">Nur Nicht erledigt</option>
          <option value="In Bearbeitung">Nur In Bearbeitung</option>
          <option value="Erledigt">Nur Erledigt</option>
        </select>
      </div>

      {/* Liste */}
      {filteredTodos.length === 0 ? (
        <motion.div 
          className="text-center py-12 text-purple-300/70 text-lg italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filter === "Alle"
            ? "Noch keine Aufgaben vorhanden..." // no todos message
            : `Keine Aufgaben mit Status "${filter}" gefunden`} 
          <br />
         
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {filteredTodos.map((todo) => ( // render filtered todos
            <TodoItem key={todo.id} todo={todo} /> // render each todo item
          ))}
        </motion.div>
      )}
    </>
  );
}