import { useEffect, useState } from "react";
import { useGameContext } from "../../context/gameContext";
import { useNPCContext } from "../../context/npcContext";

export default function BetBtns() {
  const [btn, setBtn] = useState(false);
  const [bet, setBet] = useState(0);
  const [allIn, setAllIn] = useState(false);
  const [custom, setCustom] = useState(false);
  const [fifty, setFifty] = useState(false);
  const [hund, setHund] = useState(false);
  const [fiveHund, setFiveHund] = useState(false);
  const [thou, setThou] = useState(false);
  const { updateGameState, gameState, player } = useGameContext();

  const { npcOne, npcTwo, npcThree, npcState, updateNpcState } =
    useNPCContext();

  const npcs = npcOne
    ? [
        { npc: npcOne, moneyName: "npcOneMoney", money: npcState.npcOneMoney },
        {
          npc: npcTwo,
          moneyName: "npcTwoMoney",
          money: npcState.npcMoneyTwoMoney,
        },
        {
          npc: npcThree,
          moneyName: "npcThreeMoney",
          money: npcState.npcThreeMoney,
        },
      ]
    : "";
  const betLookup = {
    50: {
      fn: () => updateGameState("pot", 50 * 2),
      value: 50,
      disabled: false,
      state: setFifty,
    },
    100: {
      fn: () => updateGameState("pot", 100 * 2),
      value: 100,
      disabled: false,
      state: setHund,
    },
    500: {
      fn: () => updateGameState("pot", 500 * 2),
      value: 500,
      disabled: false,
      state: setFiveHund,
    },
    1000: {
      fn: () => updateGameState("pot", 1000 * 2),
      value: 1000,
      disabled: false,
      state: setThou,
    },
    "custom btn": { fn: () => setBtn(true) },
    custom: {
      fn: () => updateGameState("pot", gameState.pot * 2),
      value: parseInt(bet),
    },
  };
  useEffect(() => {
    if (player.money === 0) {
      setAllIn(true);
      setCustom(true);
    } else {
      setAllIn(false);
      setCustom(false);
    }

    for (var key in betLookup) {
      if (
        betLookup[key].value > player.money &&
        typeof betLookup[key].value === "number"
      ) {
        betLookup[key].state(true);
      }
    }
  }, [player.money]);

  function handleClick(amount) {
    if (
      betLookup[amount] &&
      betLookup[amount].value > player.money &&
      typeof amount === "number"
    ) {
      betLookup[amount].disabled = true;
    }

    if (amount !== "All in") {
      if (typeof amount === "number") {
        player.money -= amount;
        updateGameState("playerMoney", player.money);
      } else if (amount === "custom") {
        player.money -= bet;
        updateGameState("playerMoney", player.money);
      }
      betLookup[amount].fn();
    } else if (amount === "All in") {
      updateGameState("pot", gameState.pot + player.money * 2);
      player.money -= player.money;
      updateGameState("playerMoney", player.money);
    }
    if (amount !== "custom btn") {
      updateGameState("mainBtns", true);
    }
    updateGameState("betBtn", false);
    updateGameState("standBtn", true);
    updateGameState("hitBtn", true);

    if (npcs) {
      npcs.forEach((npc) => {
        const bet = npc.npc.bet();
        console.log("bet: ", bet);
        updateGameState("pot", gameState.pot + bet);
        updateNpcState(npc.moneyName, npc.npc.money);
      });
    }
  }

  const handleChange = (e) => {
    setBet(e.target.value);
  };
  return (
    <div className="btns grid grid-cols-2 gap-4">
      <button
        className={`py-2 px-4 rounded-lg shadow-md transition-all 
    ${
      fifty
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-emeraldGreen text-richBlack hover:bg-gold"
    }`}
        onClick={() => handleClick(50)}
        disabled={fifty}
      >
        50
      </button>

      <button
        className={`py-2 px-4 rounded-lg shadow-md transition-all 
    ${
      hund
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-emeraldGreen text-richBlack hover:bg-gold"
    }`}
        onClick={() => handleClick(100)}
        disabled={hund}
      >
        100
      </button>

      <button
        className={`py-2 px-4 rounded-lg shadow-md transition-all 
    ${
      fiveHund
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-emeraldGreen text-richBlack hover:bg-gold"
    }`}
        onClick={() => handleClick(500)}
        disabled={fiveHund}
      >
        500
      </button>

      <button
        className={`py-2 px-4 rounded-lg shadow-md transition-all 
    ${
      thou
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-emeraldGreen text-richBlack hover:bg-gold"
    }`}
        onClick={() => handleClick(1000)}
        disabled={thou}
      >
        1000
      </button>

      <button
        className={`py-2 px-6 rounded-full shadow-lg transition-all 
       ${
         allIn
           ? "bg-gray-400 text-gray-700 cursor-not-allowed"
           : "bg-burntOrange text-white hover:bg-gold"
       }`}
        onClick={() => handleClick("All in")}
        disabled={allIn}
      >
        All in
      </button>
      {btn ? (
        <>
          <input
            className="py-2 px-4 border border-silver rounded-lg"
            placeholder="Enter bet in increments of 5"
            type="number"
            onChange={handleChange}
          />
          <button
            className="bg-royalPurple text-white py-2 px-4 rounded-lg shadow-md hover:bg-gold transition-all"
            onClick={() => handleClick("custom")}
          >
            Bet
          </button>
        </>
      ) : (
        <button
          className={`py-2 px-6 rounded-full shadow-lg transition-all 
          ${
            custom
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-royalPurple text-white hover:bg-gold"
          }`}
          onClick={() => handleClick("custom btn")}
          disabled={custom}
        >
          Custom
        </button>
      )}
    </div>
  );
}
