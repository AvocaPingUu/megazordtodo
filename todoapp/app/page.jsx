// app/page.jsx
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
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

        {/* ← EIN gemeinsamer Container mit Border für Form + Liste */}
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
          {/* Innerer Padding für Inhalte */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Eingabeformular */}
            <TodoForm />

            {/* Trennlinie zwischen Form und Liste */}
            <div className="border-t border-purple-800/40 my-6" />

            {/* Todo-Liste */}
            {todos.length === 0 ? (
              <div className="text-center py-12 text-purple-300/70 text-lg italic">
                Noch keine Aufgaben vorhanden...<br />
               
              </div>
            ) : (
              <div className="space-y-4">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </div>
        </div>

        
      </div>
    </main>
  );
}