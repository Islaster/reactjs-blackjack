import Bank from "../bank/bank";
import Hand from "../hand/hand";
import { useGameContext } from "../../context/gameContext";
import { useNPCContext } from "../../context/npcContext";
import { useState, useEffect, useMemo } from "react";

export default function Person({ name, char }) {
  const [loss, setLoss] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { player, dealer, gameState, deck } = useGameContext();
  const { npcState, npcOne, npcTwo, npcThree } = useNPCContext();
  const playerScores = [];
  const battleContext = useNPCContext();
  const isBattle = useMemo(() => !!battleContext, [battleContext]);

  let cards, bank, max;
  console.log(isBattle);
  console.log(gameState);
  const playerLookup = npcOne
    ? {
        dealer: { hand: gameState.dealerHand, "char-type": dealer },
        player: { hand: gameState.playerHand, "char-type": player },
        npcone: { hand: npcState.npcOneHand, "char-type": npcOne },
        npctwo: { hand: npcState.npcTwoHand, "char-type": npcTwo },
        npcthree: { hand: npcState.npcThreeHand, "char-type": npcThree },
      }
    : {
        dealer: { hand: gameState.dealerHand, "char-type": dealer },
        player: { hand: gameState.playerHand, "char-type": player },
      };

  useEffect(() => {
    for (var key in playerLookup) {
      if (key["char-type"]?.calculateHand().value <= 21) {
        playerScores.push(key["char-type"].calculateHand().value);
      }
    }
    max = Math.max(...playerScores);
  }, [deck]);
  useEffect(() => {
    //check when a player loses all money and add loss overlay
    if (playerLookup[char]["char-type"].money < 1 && gameState.pot === 0) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
    if (playerLookup[char]["char-type"].calculateHand().value === max) {
      setWin(true);
    } else {
      setLoss(true);
    }
  }, [gameState.pot]);
  console.log(playerLookup);
  const score = playerLookup[char]["char-type"].hand[1]?.faceDown
    ? ""
    : playerLookup[char]["char-type"]?.calculateHand();
  cards = playerLookup[char].hand;
  bank = playerLookup[char]["char-type"]?.money;

  return (
    <div className={`relative flex flex-col items-center`}>
      {/* Overlay */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg"></div>
      )}
      {/* Game Over Sign (conditionally displayed) */}
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-red-500 neon-glow animate-fade-shake">
          Game Over
        </div>
      )}
      {/* Person Details */}
      <h3 className="text-xl font-semibold text-gold">{name}</h3>
      {bank && <Bank amount={bank} />}
      <Hand cards={cards} />
      {score.html && <p className="text-electricBlue mt-2">{score.html}</p>}
    </div>
  );
}
