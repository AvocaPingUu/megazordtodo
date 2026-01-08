// app/page.jsx

import TodoForm from "@/components/TodoForm";
import TodoListWithFilter from "@/components/TodoListWithFilter";
import PixelSnow from "@/components/PixelSnow";
import PageContent from "@/components/PageContent";
import { getTodos } from "@/lib/todos";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#1a1428] via-[#221735] to-[#2a1e3f] p-6 flex flex-col items-center overflow-hidden">
      <PixelSnow 
        density={0.8}
        speed={1.2}
        pixelSize={2}
        minPixelSize={0.5}
        brightness={0.9}
      />
      <PageContent initialTodos={todos} />
    </main>
  );
}