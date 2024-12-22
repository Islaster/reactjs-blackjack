import { createContext, useContext, useState, useRef } from "react";
import { Player } from "../models/Player";
import { getNewShuffledDeck } from "../utility/Deck";
import { Dealer } from "../models/dealer";

const BlackjackContext = createContext();

export const BlackjackProvider = ({ children }) => {
  const [playerHand, setPlayerHand] = useState([]),
    [dealerHand, setDealerHand] = useState([]),
    [playerMoney, setPlayerMoney] = useState(2000),
    player = useRef(new Player("Player", 2000, setPlayerHand)).current,
    dealer = useRef(new Dealer("John", setDealerHand)).current;

  const newGame = (pot, deck, turnCount) => {
    const newDeck = getNewShuffledDeck();
    dealer.emptyHand();
    player.emptyHand();
    dealer.drawCard(newDeck.pop());
    dealer.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    deck.set([...newDeck]);
    pot.set(0);
    dealer.money = 2000;
    player.money = 2000;
    turnCount.set(1);
  };

  const newRound = (pot, deck, turnCount) => {
    const newDeck = [...deck.value];
    dealer.emptyHand();
    player.emptyHand();
    dealer.drawCard(newDeck.pop());
    dealer.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    player.drawCard(newDeck.pop());
    deck.set([...newDeck]);
    pot.set(0);
    turnCount.set(turnCount.value + 1);
  };

  const value = {
    player,
    dealer,
    playerHand: { value: playerHand, set: setPlayerHand },
    dealerHand: { value: dealerHand, set: setDealerHand },
    playerMoney: { value: playerMoney, set: setPlayerMoney },
    newGame,
    newRound,
  };
  return (
    <BlackjackContext.Provider value={value}>
      {children}
    </BlackjackContext.Provider>
  );
};

export const useBlackJackContext = () => useContext(BlackjackContext);
