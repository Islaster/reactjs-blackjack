import GameModes from "./gameModes";
import { useState } from "react";
import Leaderboard from "./components/leaderboard/leaderboard";

export default function GameMenu({setGameMenu, setGameStart, setGameBattleStart, setTournStart, setTournBattleStart}) {
  const [main, setMain] = useState(true)
  const [game, setGame] = useState(false);
  const [tourn, setTourn] = useState(false);

  const handleClick = (state) => {
    setMain(false);
    state(true);
  };
  function renderMain() {
    return (
      <>
        <div className="left">
        <header>BLACKJACK</header>
        <button onClick={()=>handleClick(setGame)}>Play Game</button>
        <button onClick={()=>handleClick(setTourn)}>Play Tournament</button>
        </div>
        <div className="right"> 
          <header>Leaderboard</header>
          <div>
            <Leaderboard />
          </div>
        </div>
      </>
    );
  }

  function renderGameType(prop) {
    return <GameModes
      gameType={prop}
      setGameMenu={setGameMenu}
      setGameStart={setGameStart}
      setGameBattleStart={setGameBattleStart}
      setTournStart={setTournStart}
      setTournBattleStart={setTournBattleStart}
      game={game}
      tourn={tourn}
    />;
  }

    return (
    <div>
      {main && renderMain()}
      {game && renderGameType("Game")}
      {tourn && renderGameType("Tournament")}
    </div>
  );
}
