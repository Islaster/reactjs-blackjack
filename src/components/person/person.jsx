import Bank from "../bank/bank";
import Hand from "../hand/hand";
import { useBlackJackContext } from "../../context/blackjackContext";

export default function Person({ position, name }) {
  const { playerHand, dealerHand, player, playerMoney } = useBlackJackContext();
  let cards, bank, isDealer;

  const playerScore = player.calculateHand();

  if (name.split(" ").includes("dealer")) {
    isDealer = true;
  }
  if (!isDealer) {
    cards = playerHand;
    bank = playerMoney.value;
    console.log("player money: ", playerMoney);
  } else {
    cards = dealerHand;
  }
  return (
    <div className={`person ${position} flex flex-col items-center`}>
      <span className="text-center mb-2">
        <h3 className="text-xl font-semibold text-gold">{name}</h3>
        {!isDealer && <Bank amount={bank} />}
      </span>
      <Hand cards={cards} />
      {!isDealer && <p className="text-electricBlue mt-2">{playerScore}</p>}
    </div>
  );
}
