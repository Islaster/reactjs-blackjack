import Btn from "../btn/btn";
import { useState } from "react";
import BetBtns from "../betBtns/betBtns";

export default function Btns() {
  const [btns, setBtns] = useState(true);
  function renderBtns() {
    return (
      <div className="btns flex space-x-4 mt-4">
        <Btn type="bet" mainBtns={{ value: btns, set: setBtns }} />
        <Btn type="hit" mainBtns={{ value: btns, set: setBtns }} />
        <Btn type="stand" mainBtns={{ value: btns, set: setBtns }} />
      </div>
    );
  }
  return (
    <>
      {btns && renderBtns()}
      {!btns && <BetBtns btns={{ value: btns, set: setBtns }} />}
    </>
  );
}
