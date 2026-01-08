// components/AnimatedTodoContent.jsx
"use client";

import { motion } from "framer-motion";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";

const titleVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const boxVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function AnimatedTodoContent({ todos }) {
  return (
    <div className="w-full max-w-3xl space-y-10">
      {/* 1. Überschrift */}
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl font-bold tracking-tight text-center mt-8"
      >
        <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          Todo App
        </span>
      </motion.h1>

      {/* 2. Container-Box */}
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        className="
          rounded-2xl
          border border-purple-800/60
          bg-purple-950/30
          backdrop-blur-sm
          shadow-xl shadow-purple-950/30
          overflow-hidden
        "
      >
        <div className="p-6 md:p-8 space-y-8">
          <TodoForm />

          <div className="border-t border-purple-800/40 my-6" />

          <motion.div variants={listVariants} initial="hidden" animate="visible">
            {todos.length === 0 ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="text-center py-12 text-purple-300/70 text-lg italic"
              >
                Noch keine Aufgaben vorhanden...<br />
                <span className="text-purple-400">Füge oben eine neue Aufgabe hinzu ✨</span>
              </motion.div>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </motion.div>
        </div>
      </motion.div>

      <p className="text-center text-sm text-purple-400/50 pt-8">
        Dark Violet Mode • Nur im Speicher • {new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  );
}