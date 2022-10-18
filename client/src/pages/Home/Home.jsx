import { useState } from "react";

import Chips from "./components/Chips";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const chipsContent = ["All", "Remaining", "Completed"];

const Home = () => {
  const [activeChip, setActiveChip] = useState("All");

  return (
    <main className="min-h-screen min-w-[100vw] bg-gradient-to-br from-indigo-700 to-purple-700 pt-10">
      <div className="mx-auto max-w-xl px-5 md:px-0">
        <TodoForm />
        <Chips
          chips={chipsContent}
          active={activeChip}
          setActive={setActiveChip}
        />
        <TodoList filter={activeChip} />
      </div>
    </main>
  );
};

export default Home;
