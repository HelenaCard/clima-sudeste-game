import { useState } from "react";
import { Hero } from "@/components/Hero";
import { GameBoard } from "@/components/GameBoard";
import { About } from "@/components/About";

const Index = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <main className="min-h-screen">
      {showGame ? (
        <GameBoard onBack={() => setShowGame(false)} />
      ) : (
        <>
          <Hero onStartGame={() => setShowGame(true)} />
          <About />
        </>
      )}
    </main>
  );
};

export default Index;
