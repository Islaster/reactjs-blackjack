import Bank from "../bank/bank";
import Hand from "../hand/hand";
import { useBlackJackContext } from "../../context/blackjackContext";

export default function Person({ position, name }) {
  const { playerHand, dealerHand, player,playerMoney } = useBlackJackContext();
  let cards, bank, isDealer;

  const playerScore = player.calculateHand();


  if (name.split(' ').includes('dealer')) {
    isDealer = true;
  }
  if (!isDealer) {
    cards = playerHand
    bank = playerMoney.value
    console.log("player money: ",playerMoney)
  } else { 
    cards = dealerHand
  }
  return (
    <div className={`person ${position}`}>
      <span>
        <h3 className="name">{name}</h3>
        {
          isDealer ?
            <></>:
        <Bank amount={bank}/>
        }
      </span>
      <Hand cards={cards} />
      {!isDealer? playerScore:<></>}
    </div>
  );
}
