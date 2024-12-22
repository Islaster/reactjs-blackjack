import Btn from "../btn/btn";
import { useState } from "react";
import BetBtns from "../betBtns/betBtns";

export default function Btns() {

  const [btns, setBtns] = useState(true);
  function renderBtns() {
      //write functionality to disable buttons bet should be disabled after choosing a bet, hit, should be disabled after hitting stand.
    return (
      <div className="btns">
        <Btn type="bet" mainBtns={{"value":btns, "set":setBtns}} />
        <Btn type="hit" mainBtns={{"value":btns, "set":setBtns}}/>
        <Btn type="stand" mainBtns={{"value":btns, "set":setBtns}}/>
      </div>
    );
  }
    return <>
        {btns && renderBtns()} 
        {btns === false && <BetBtns btns={{"value":btns, "set":setBtns}} />}
    </>;
}
