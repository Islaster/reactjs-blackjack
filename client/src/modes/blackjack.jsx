import { useEffect } from "react";
import Title from "../components/css/title";
import Person from "../components/person/person";
import Pot from "../components/pot/pot";
import { useNPCContext } from "../context/npcContext";
import { useGameContext } from "../context/gameContext";
import Btns from "../components/btns/btns";

export default function BattleBlackjack() {
  const { gameState, dealer, player, newGame } = useGameContext();

  useEffect(() => {
    newGame(player, dealer);
  }, []);
  return (
    <div className="w-screen bg-richBlack text-white flex flex-col justify-between items-center py-6">
      <Title> Blackjack</Title>
      <Person name="Dealer" char="dealer" />
      <Pot amount={gameState.pot} />
      <Person name="player" char="player" />
      <Btns />
      <div className="bg-richBlack text-center mt-4 py-4 rounded-lg shadow-md w-screen">
        <p>
          Wins: <span className="text-emeraldGreen">{gameState.winCount}</span>
        </p>
        <p>
          Losses:{" "}
          <span className="text-burntOrange">{gameState.lossCount}</span>
        </p>
        <p>
          Draws: <span className="text-silver">{gameState.drawCount}</span>
        </p>
      </div>
    </div>
  );
}
