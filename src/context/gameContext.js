import { createContext, useContext, useState, useRef } from "react";
import { Player } from "../models/Player";
import { Dealer } from "../models/Dealer";
import { getNewShuffledDeck } from "../utility/Deck";

const GameContext = createContext();

export const GameProvider = ({ deck, setDeck, children }) => {
  const [gameState, setGameState] = useState({
    deck: [],
    pot: 0,
    turnCount: 1,
    lose: false,
    win: false,
    draw: false,
    standBtn: false,
    betBtn: true,
    hitBtn: false,
    mainBtns: true,
    winCount: 0,
    lossCount: 0,
    drawCount: 0,
    playerHand: [],
    playerMoney: 0,
    dealerHand: [],
  });

  const dealerNames = [
    "Ace",
    "Maverick",
    "Scarlet",
    "Rogue",
    "Vega",
    "Blaze",
    "Ivory",
    "Cypress",
    "Jade",
    "Sterling",
  ];

  const updateGameState = (key, value) => {
    setGameState((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "number" ? prev[key] + value : value,
    }));
  };

  const randomDealer = Math.floor(Math.random() * dealerNames.length);

  const player = useRef(
    new Player("John", 2000, (hand) => updateGameState("playerHand", hand))
  ).current;
  const dealer = useRef(
    new Dealer(dealerNames[randomDealer], (hand) =>
      updateGameState("dealerHand", hand)
    )
  ).current;

  const newGame = (player, dealer, ...npcs) => {
    const newDeck = getNewShuffledDeck();
    const playerLookup = npcs ? [player, dealer, ...npcs] : [player, dealer];
    playerLookup.forEach((player) => {
      player.emptyHand();
      player.drawCard(newDeck.shift());
      if (player.name !== "John") {
        const newCard = { ...newDeck.shift(), faceDown: true };
        player.drawCard(newCard);
      } else {
        player.drawCard(newDeck.shift());
      }
      if (player.difficulty) {
        switch (player.difficulty) {
          case "easy":
            player.money = 1000;
            break;
          case "medium":
            player.money = 1500;
            break;
          case "hard":
            player.money = 2000;
            break;
          default:
            player.money = 2000;
            break;
        }
      }
    });
    setDeck([...newDeck]);
    setGameState((prev) => ({ ...prev, ["pot"]: 0 }));
    setGameState((prev) => ({ ...prev, ["turnCount"]: 1 }));
  };

  const newRound = (player, dealer, state, ...npcs) => {
    //Start new round
    const newDeck = getNewShuffledDeck();
    const playerLookup = npcs ? [player, dealer, ...npcs] : [player, dealer];

    playerLookup.forEach((player) => {
      //if player exists
      if (player) {
        player.emptyHand();
        //if player has no money don't give them cards or is not the dealer
        if (player.money > 0 || player instanceof Dealer) {
          player.drawCard(newDeck.shift());
          if (player.name !== "John") {
            const newCard = { ...newDeck.shift(), faceDown: true };
            player.drawCard(newCard);
          } else {
            player.drawCard(newDeck.shift());
          }
        }
      }

      setDeck([...newDeck]);
      setGameState((prev) => ({ ...prev, ["pot"]: 0 }));
      updateGameState("turnCount: ", 1);
    });
  };

  const endGame = (onBtnsUpdate, animationUpdate) => {
    //End game animation

    //Change buttons e.g. main menu, new game, mode menu
    onBtnsUpdate(["Main Menu", "Mode Menu", "New Game"]);
  };

  const value = {
    newGame,
    newRound,
    endGame,
    player,
    dealer,
    gameState,
    deck,
    setDeck,
    updateGameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
