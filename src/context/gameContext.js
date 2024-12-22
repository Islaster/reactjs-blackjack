import { createContext, useContext, useState, useRef } from "react";

import { getNewShuffledDeck } from "../utility/Deck";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [deck, setDeck] = useState(getNewShuffledDeck()),
    [pot, setPot] = useState(0),
    [turnCount, setTurnCount] = useState(1),
    [lose, setLose] = useState(false),
    [win, setWin] = useState(false),
    [draw, setDraw] = useState(false),
    [standBtn, setStandBtn] = useState(false),
    [betBtn, setBetBtn] = useState(true),
    [hitBtn, setHitBtn] = useState(false),
    [winCount, setWinCount] = useState(0),
    [lossCount, setLossCount] = useState(0),
    [drawCount, setDrawCount] = useState(0);

  const value = {
    deck: { value: deck, set: setDeck },
    pot: { value: pot, set: setPot },
    turnCount: { value: turnCount, set: setTurnCount },
    standBtn: { value: standBtn, set: setStandBtn },
    hitBtn: { value: hitBtn, set: setHitBtn },
    betBtn: { value: betBtn, set: setBetBtn },
    lose: { value: lose, set: setLose },
    draw: { value: draw, set: setDraw },
    win: { value: win, set: setWin },
    winCount: { value: winCount, set: setWinCount },
    drawCount: { value: drawCount, set: setDrawCount },
    lossCount: { value: lossCount, set: setLossCount },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
