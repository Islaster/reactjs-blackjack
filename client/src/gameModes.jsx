import { useState } from "react";

export default function GameModes({
  gameType,
  game,
  tourn,
  setGameStart,
  setTournStart,
  setGameBattleStart,
  setTournBattleStart,
}) {
  const [gameModeBtns, setGameModeBtns] = useState(true);
  const handleClick = (gameMode) => () => {
    if (game) {
      if (gameMode === "battle") {
        setGameBattleStart(true);
      }
      if (gameMode === "normal") {
        setGameStart(true);
      }
    }
    if (tourn) {
      if (gameMode === "battle") {
        setTournBattleStart(true);
      }
      if (gameMode === "normal") {
        setTournStart(true);
      }
    }
    console.log("handle click function called");
    setGameModeBtns(false);
  };

  function renderGameModeBtns() {
    return (
      <div className="h-screen bg-richBlack flex flex-col justify-center items-center text-white">
        {/* Header */}
        <header className="text-4xl font-bold text-center neon-title text-electricBlue mb-12">
          Choose The Game Mode
        </header>

        {/* Buttons */}
        <div className="flex space-x-8">
          {/* Normal Mode Button */}
          <button
            className="bg-emeraldGreen text-white text-xl font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gold hover:text-black transition-all duration-300"
            onClick={handleClick("normal")}
          >
            Normal {gameType}
          </button>

          {/* Battle Mode Button */}
          <button
            className="bg-royalPurple text-white text-xl font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-gold hover:text-black transition-all duration-300"
            onClick={handleClick("battle")}
          >
            Battle {gameType}
          </button>
        </div>
      </div>
    );
  }
  return <>{gameModeBtns && renderGameModeBtns()}</>;
}
