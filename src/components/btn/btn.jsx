import { useBlackJackContext } from "../../context/blackjackContext";
import { useGameContext } from "../../context/gameContext";
import { potWinnings } from "../../utility/calculationFunctionality";
import { dealerLogic } from "../characters/dealer";
import { useEffect } from "react";

export default function Btn({
  type,
  mainBtns,
}) {
  const { player, dealer, playerHand, dealerHand, playerMoney, newRound } = useBlackJackContext();
  const { deck, standBtn, betBtn, hitBtn, pot, lossCount, winCount, drawCount, turnCount } = useGameContext();
  const newDeck = deck?.value;

  // Determine if the button should be disabled
  let disabled = false;
  if (type === 'hit') {
    disabled = hitBtn.value;
  } else if (type === 'stand') {
    disabled = standBtn.value;
  } else if (type === 'bet') {
    disabled = betBtn.value;
  }

  // Update button states when betBtn.value changes
  useEffect(() => {
    if (betBtn?.value) {
      standBtn?.set(false);
      hitBtn?.set(false);
    }
  }, [betBtn?.value, standBtn, hitBtn]);

  // Logic for each button click
  const btnLookup = {
    // Show bet options
    bet: () => mainBtns.set(false),
    
    // Add card to player's hand
    hit: () => {
      const card = newDeck.pop();
      player?.drawCard(card);
      playerHand.set([...player.hand]);
    },
    
    // Initiate dealer's turn and calculate pot winnings
    stand: () => {
      dealer.hand[0].facedown = false;
      dealerHand.set(dealer.hand);
      dealerLogic(dealer, deck.value);
      console.log("dealer logic called")
      setTimeout(() => {
        const result = potWinnings(pot, [player, dealer], [{ name: 'Player', "set": playerMoney }]);
        if (result[0].name === 'dealer' && result.length === 1) {
          lossCount.set(lossCount.value + 1)
        } else if (result[0].name === 'player' && result.length === 1) {
          winCount.set(winCount.value + 1); 
        } else if (result.length === 2) {
          drawCount.set(drawCount.value + 1);
        }
      }, 500)
      newRound(pot, deck, turnCount)
    },
  };

  // Handle button click
  function handleClick() {
    if (btnLookup[type]) {
      btnLookup[type]();
    }
  }

  return (
    <button
      disabled={!disabled}
      className="btn"
      onClick={handleClick} // Only trigger onClick here, not during render
    >
      {type}
    </button>
  );
}
