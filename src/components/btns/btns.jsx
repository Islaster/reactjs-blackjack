import Btn from "../btn/btn";
import { useState } from "react";
import BetBtns from "../betBtns/betBtns";
import { useGameContext } from "../../context/gameContext";

export default function Btns() {
  const { gameState } = useGameContext();
  const [types, setTypes] = useState(["bet", "hit", "stand"]);

  function renderBtns() {
    return (
      <div className="btns flex space-x-4 mt-4">
        {types.map((type, key) => {
          return <Btn key={key} type={type} />;
        })}
      </div>
    );
  }
  return (
    <>
      {gameState.mainBtns && renderBtns()}
      {!gameState.mainBtns && <BetBtns />}
    </>
  );
}
