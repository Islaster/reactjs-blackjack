import { useState } from "react";
import { useGameContext } from "../../context/gameContext";
import { useBlackJackContext } from "../../context/blackjackContext";

export default function BetBtns({ btns }) {
  const [btn, setBtn] = useState(false);
  const [bet, setBet] = useState(0);
  const { pot, standBtn, hitBtn, betBtn } = useGameContext();
  const { player, playerMoney } = useBlackJackContext();

  const betLookup = {
    50: {
      "fn": () => pot.set(pot.value + (50 * 2)),
      "value": 50,
      "disabled": false,
    },
    100: {
      "fn": () => pot.set(pot.value + (100 * 2)),
      "value": 100,
      "disabled": false,
    },
    500: {
      "fn": () => pot.set(pot.value + (500 * 2)),
      "value": 500,
      "disabled": false,
    },
    1000: {
      "fn": () => pot.set(pot.value + (1000 * 2)),
      "value": 1000,
      "disabled": false,
    },
    "custom btn": {"fn":() => setBtn(true)},
    custom: {
      "fn": () => pot.set(pot.value + (parseInt(bet) * 2)),
      "value": parseInt(bet),
    },
  };

  if (player.money < betLookup && !betLookup["custom btn"]) {
    for (const key in betLookup) {
      if (betLookup[key].disabled) {
        while (betLookup[key].value < player.money) {
          betLookup[key].disabled = true;
        }
        if (betLookup[key].value > player.money) {
          betLookup[key].disabled = true
        }
      }
    }
  }

  function handleClick(name) {
    if (name != "All in") {
      if (typeof name === "number") {
        player.money -= name;
        playerMoney.set(player.money);
      } else if (name === "custom") {
        player.money -= bet;
        playerMoney.set(player.money)
      }
      betLookup[name].fn();
    } else if (name === "All in") {
      pot.set(pot.value + (player.money)*2);
      player.money -= player.money;
      playerMoney.set(player.money);
    }
    if (name != "custom btn") {
      btns.set(true);
    }
    betBtn.set(false);
    standBtn.set(true);
    hitBtn.set(true);
  }

  const handleChange = (e) => {
    setBet(e.target.value);
  };
  console.log(btn);
  return (
    <div className="btns">
      <button onClick={() => handleClick(50)} disabled={betLookup[50].disabled}>50</button>
      <button onClick={() => handleClick(100)} disabled={betLookup[100].disabled}>100</button>
      <button onClick={() => handleClick(500)} disabled={betLookup[500].disabled}>500</button>
      <button onClick={() => handleClick(1000)} disabled={betLookup[1000].disabled}>1000</button>
      <button onClick={() => handleClick("All in")}>All in</button>
      {btn ? (
        <>
          <input
            placeholder="enter bet in increments of 5"
            type="number"
            onChange={handleChange}
          />
          <button onClick={() => handleClick("custom")}>bet</button>
        </>
      ) : (
        <button onClick={() => handleClick("custom btn")}>Custom</button>
      )}
    </div>
  );
}
