import { useEffect } from "react";
import Title from "../components/css/title";
import Person from "../components/person/person";
import Pot from "../components/pot/pot";
import { useNPCContext } from "../context/npcContext";
import { useGameContext } from "../context/gameContext";
import Btns from "../components/btns/btns";

export default function BattleBlackjack() {
  const { npcOne, npcTwo, npcThree, updateNpcState } = useNPCContext();
  const { gameState, dealer, player, newGame, deck } = useGameContext();

  useEffect(() => {
    newGame(player, dealer, updateNpcState, npcOne, npcTwo, npcThree);
  }, []);
  const npcs = [npcOne, npcTwo, npcThree];
  useEffect(() => {
    npcs.forEach((npc) => {
      npc.setDeck(deck);
    });
  }, [deck]);
  return (
    <div className="w-screen bg-richBlack text-white flex flex-col justify-between items-center py-6">
      <Title>Battle Blackjack</Title>
      <Person name="Dealer" char="dealer" />
      <Pot amount={gameState.pot} />
      <span className="flex justify-around items-center w-full mt-6">
        <Person name="player" char="player" />
        <Person name={npcOne.name} char="npcone" />
        <Person name={npcTwo.name} char="npctwo" />
        <Person name={npcThree.name} char="npcthree" />
      </span>
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
