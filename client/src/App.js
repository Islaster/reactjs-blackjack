import { useState } from "react";
import GameMenu from "./gameMenu";
import Blackjack from "./modes/blackjack";
import BattleBlackjack from "./modes/battleBlackjack";
import TournBlackjack from "./modes/tournamentBlackjack";
import BattleTournBlackjack from "./modes/BattleTournamentBlackjack";
import "./css/card-deck-css/css/cardstarter.css";
import { GameProvider } from "./context/gameContext";
import { NPCProvider } from "./context/npcContext";

function App() {
  //DOM variables
  const [gameMenuStart, setGameMenuStart] = useState(true),
    [gameStart, setGameStart] = useState(false),
    [gameBattleStart, setGameBattleStart] = useState(false),
    [tournStart, setTournStart] = useState(false),
    [tournBattleStart, setTournBattleStart] = useState(false);
  const [deck, setDeck] = useState([]);
  /*Render Game Menu
    if play is clicked trigger difficulty choice and rule choice default blackjack game
    if tournament is clicked trigger choice between casino tournament and amateur rules, tournament has 4 rival NPCs
    if 
      */

  function renderGame(name) {
    const gameModeLookup = {
      blackjack: <Blackjack />,
      "battle blackjack": <BattleBlackjack />,
      tournament: <TournBlackjack />,
      "battle tournament": <BattleTournBlackjack />,
    };

    return gameModeLookup[name];
  }

  return (
    <>
      {gameMenuStart && (
        <GameMenu
          setGameMenu={setGameMenuStart}
          setGameStart={setGameStart}
          setGameBattleStart={setGameBattleStart}
          setTournStart={setTournStart}
          setTournBattleStart={setTournBattleStart}
        />
      )}
      <GameProvider deck={deck} setDeck={setDeck}>
        {gameStart && renderGame("blackjack")}
        <NPCProvider deck={deck}>
          {gameBattleStart && renderGame("battle blackjack")}
        </NPCProvider>
        {tournStart && <TournBlackjack />}
        {tournBattleStart && <BattleTournBlackjack />}
      </GameProvider>
    </>
  );
}

export default App;
