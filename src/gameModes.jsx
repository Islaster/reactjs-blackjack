import { useState } from "react";

export default function GameModes({ gameType, game, tourn, setGameStart, setTournStart, setGameBattleStart, setTournBattleStart }) {
    const [gameModeBtns, setGameModeBtns] = useState(true);
    const handleCLick = (gameMode) => () => {
        if (game) {
            if (gameMode === "battle") {
                setGameBattleStart(true);
            }
            if (gameMode === "normal") {
                setGameStart(true);
            }
        }
        if (tourn) {
            if (gameMode === 'battle') {
                setTournBattleStart(true);
            }
            if (gameMode === "normal") {
                setTournStart(true);
            }
        }
        console.log('handle click function called');
        setGameModeBtns(false);
    }
    
    function renderGameModeBtns() {
       return<div>
        <header>Choose The Game Mode</header>
        <button onClick={handleCLick('normal')}>Normal {gameType}</button>
        <button onClick={handleCLick('battle')}>Battle {gameType}</button>
      </div>        
    }
  return (
      <>
          {gameModeBtns && renderGameModeBtns()}
    </>
  );
}
