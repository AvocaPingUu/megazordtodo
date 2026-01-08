// app/page.jsx


import { motion } from "framer-motion";
import TodoForm from "@/components/TodoForm";
import TodoListWithFilter from "@/components/TodoListWithFilter";
import { getTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1428] via-[#221735] to-[#2a1e3f] p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-10">
        {/* Großer Titel */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-center mt-8">
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Todo App
          </span>
        </h1>

        {/* Gemeinsame Container-Box */}
        <div
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
            {/* Eingabeformular */}
            <TodoForm />

            {/* Trennlinie */}
            <div className="border-t border-purple-800/40 my-6" />

            {/* Todo-Liste mit Filter */}
            <TodoListWithFilter initialTodos={todos} />
          </div>
        </div>

       
      </div>
    </main>
  );
}