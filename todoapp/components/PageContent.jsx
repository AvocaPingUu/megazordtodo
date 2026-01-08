"use client";

import { motion } from "framer-motion";
import TodoForm from "@/components/TodoForm";
import TodoListWithFilter from "@/components/TodoListWithFilter";

export default function PageContent({ initialTodos }) {
  return (
    <>
      <div className="w-full max-w-3xl space-y-10 relative z-10">
        {/* title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center mt-8">
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Todo App
          </span>
        </h1>

        {/* container box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
            {/* form */}
            <TodoForm />

            {/* line */}
            <div className="border-t border-purple-800/40 my-6" />

            {/* todo list with filters */}
            <TodoListWithFilter initialTodos={initialTodos} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
