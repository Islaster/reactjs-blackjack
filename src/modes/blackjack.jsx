import Person from "../components/person/person";
import { useEffect } from "react";
import Pot from "../components/pot/pot";
import Btns from "../components/btns/btns";
import { useGameContext } from "../context/gameContext";
import { useBlackJackContext } from "../context/blackjackContext";

export default function Blackjack() {
  const { hitBtn, betBtn, standBtn, pot, deck, turnCount,   winCount, lossCount, drawCount } = useGameContext()
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
    betBtn.set(true)
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
      dealer.drawCard({ ...newDeck.pop(), facedown: true })
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
          turnCount.set(0)
        },500)
      } else {
        //put bust animation
        //put a timer on turnCount
        hitBtn.set(false);
        standBtn.set(false);
                setTimeout(() => {
                  turnCount.set(1);
        },500)
      }
    }
    if (dealer.calculateHand() > 21) {
      if (turnCount.value === 1) {
        //put a timer on turnCount 
        turnCount.set(0)
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
    <>
      <h1>Blackjack Game</h1>
      <Person
        position="top"
        name="dealer"
      />
      <Pot amount={pot.value} />
      <Person
        position='bottom'
        name='player'
      />
      <Btns />
      <div>
        wins: {winCount.value}<br />
        losses: {lossCount.value}<br />
        draws: {drawCount.value}<br />
      </div>
    </>
  );
}
