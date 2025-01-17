import Person from "../components/person/person";
import { useEffect } from "react";
import Pot from "../components/pot/pot";
import Btns from "../components/btns/btns";
import { useGameContext } from "../context/gameContext";
import { useBlackJackContext } from "../context/blackjackContext";

export default function Blackjack() {
  const {
    hitBtn,
    betBtn,
    standBtn,
    pot,
    deck,
    turnCount,
    winCount,
    lossCount,
    drawCount,
  } = useGameContext();
  const { dealerHand, playerHand, dealer, player } = useBlackJackContext();
  function init() {
    const newDeck = [...deck.value];
    dealer.emptyHand();
    player.emptyHand();
    dealer.drawCard(newDeck.pop());
    dealer.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    deck.set(newDeck);
    betBtn.set(true);
  }

  useEffect(() => {
    if (turnCount.value <= 1) {
      betBtn.set(true);
      standBtn.set(false);
      hitBtn.set(false);
      const newDeck = [...deck.value];
      player.money = 2000;
      dealer.money = 2000;
      pot.set(0);
      if (player.hand.length > 0) {
        player.emptyHand();
      }
      if (dealer.hand.length > 0) {
        dealer.emptyHand();
      }
      dealer.drawCard({ ...newDeck.pop(), facedown: true });
      dealer.drawCard(newDeck.pop());
      player.drawCard(newDeck.pop());
      player.drawCard(newDeck.pop());
      deck.set(newDeck);
    } else {
      init();
    }
  }, [turnCount.value]); // Runs only when turnCount.value changes

  useEffect(() => {
    if (player.calculateHand() > 21) {
      //bust logic
      if (turnCount.value === 1) {
        //put bust animation
        //put a timer on turnCount
        hitBtn.set(false);
        standBtn.set(false);
        setTimeout(() => {
          turnCount.set(0);
        }, 500);
      } else {
        //put bust animation
        //put a timer on turnCount
        hitBtn.set(false);
        standBtn.set(false);
        setTimeout(() => {
          turnCount.set(1);
        }, 500);
      }
    }
    if (dealer.calculateHand() > 21) {
      if (turnCount.value === 1) {
        //put a timer on turnCount
        turnCount.set(0);
      } else {
        //put a timer on turnCount
        turnCount.set(1);
      }
    }
  }, [playerHand, dealerHand]);

  if (playerHand.length === 0) {
    init();
  }
  return (
    <div className="h-screen bg-richBlack text-white flex flex-col justify-between items-center py-6">
      {/* Title */}
      <h1 className="text-4xl font-bold neon-title text-electricBlue mb-6">
        Blackjack Game
      </h1>

      {/* Dealer Section */}
      <Person position="top" name="Dealer" />

      {/* Pot */}
      <Pot amount={pot.value} />

      {/* Player Section */}
      <Person position="bottom" name="Player" />

      {/* Buttons */}
      <Btns />

      {/* Game Info */}
      <div className="bg-richBlack text-center mt-4 py-4 rounded-lg shadow-md w-screen h-screen">
        <p>
          Wins: <span className="text-emeraldGreen">{winCount.value}</span>
        </p>
        <p>
          Losses: <span className="text-burntOrange">{lossCount.value}</span>
        </p>
        <p>
          Draws: <span className="text-silver">{drawCount.value}</span>
        </p>
      </div>
    </div>
  );
}
