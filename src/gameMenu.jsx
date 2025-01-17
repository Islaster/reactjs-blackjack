import GameModes from "./gameModes";
import { useState } from "react";
import Leaderboard from "./components/leaderboard/leaderboard";
import "./gameMenu.css";

export default function GameMenu({
  setGameMenu,
  setGameStart,
  setGameBattleStart,
  setTournStart,
  setTournBattleStart,
}) {
  const [main, setMain] = useState(true);
  const [game, setGame] = useState(false);
  const [tourn, setTourn] = useState(false);

  const handleClick = (state) => {
    setMain(false);
    state(true);
  };

  function renderMain() {
    return (
      <div className="h-screen bg-richBlack flex flex-col justify-center items-center">
        <header className="text-6xl font-bold text-center neon-title text-electricBlue">
          BLACKJACK
        </header>
        <p className="text-gold text-xl italic mb-12">
          The ultimate card game experience awaits you.
        </p>
        <div className="flex justify-between items-center w-3/4">
          {/* Buttons Container */}
          <div className="flex space-x-6 w-1/2 text-center">
            <button
              className="bg-emeraldGreen text-white text-lg font-medium py-3 px-6 rounded-full shadow-lg hover:bg-gold hover:text-black transition-all duration-300"
              onClick={() => handleClick(setGame)}
            >
              Play Game
            </button>
            <button
              className="bg-royalPurple text-white text-lg font-medium py-3 px-6 rounded-full shadow-lg hover:bg-gold hover:text-black transition-all duration-300"
              onClick={() => handleClick(setTourn)}
            >
              Play Tournament
            </button>
          </div>

          {/* Leaderboard */}
          <div className="w-1/2 p-6 rounded-lg shadow-lg">
            <Leaderboard />
          </div>
        </div>
      </div>
    );
  }

  function renderGameType(prop) {
    return (
      <GameModes
        gameType={prop}
        setGameMenu={setGameMenu}
        setGameStart={setGameStart}
        setGameBattleStart={setGameBattleStart}
        setTournStart={setTournStart}
        setTournBattleStart={setTournBattleStart}
        game={game}
        tourn={tourn}
      />
    );
  }

  return (
    <div>
      {main && renderMain()}
      {game && renderGameType("Game")}
      {tourn && renderGameType("Tournament")}
    </div>
  );
}
