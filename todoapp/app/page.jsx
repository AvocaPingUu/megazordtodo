
import Image from "next/image";
import TodoItem from "@/components/TodoItem";


export default function Home() {
  return (
    <main className="min-h-screen flex items-top
   justify-center
     bg-gradient-to-br from-[#1a1428] via-[#221735] to-[#2a1e3f] p-6">
      <div className="text-center space-y-10 max-w-3xl">
        


        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mt-7">
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Todo App
          </span>
        </h1>
      
        <div>
          
          <TodoItem todo={{ id: 1, title: "Erstes Todo", description: "Beschreibung des ersten Todos", completed: false }} /></div>
        

      </div>
      
    </main>
  );
}