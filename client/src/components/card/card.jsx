import { useNPCContext } from "../../context/npcContext";
import { useGameContext } from "../../context/gameContext";

export default function Card({ cardInfo, faceDown }) {
  const card = cardInfo;
  const { npcOne, npcTwo, npcThree } = useNPCContext();
  const { player, dealer } = useGameContext();

  const suit = {
    h: "hearts",
    s: "spades",
    d: "diamonds",
    c: "clubs",
  };
  let cardClass;
  try {
    if (parseInt(card.value) > 1 && parseInt(card.value) < 11) {
      cardClass = `card ${suit[card.face[0]]} r${card.value}`;
      if (parseInt(card.value) < 10) {
        cardClass = `card ${suit[card.face[0]]} r0${card.value}`;
      }
    } else {
      cardClass = `card ${suit[card.face[0]]} ${card.face[1]}`;
    }
    const dealerAces = dealer.hand.filter((card) => card.value === 11);
    const playerAces = player.hand.filter((card) => card.value === 11);
    if (playerAces.length >= 1) {
      if (player.calculateHand() > 21) {
        player.hand.map((card) => {
          if (card.value === 11) {
            card.value = 1;
          }
        });
      }
    } else if (dealerAces.length >= 1) {
      if (dealer.calculateHand() > 21) {
        dealer.hand.map((card) => {
          if (card.value === 11) {
            card.value = 1;
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
    console.log("dealer: ", dealer);
    console.log("player: ", player);
    console.log("npcOne: ", npcOne);
    console.log("npcTwo: ", npcTwo);
    console.log("npcThree: ", npcThree);
    console.log(card);
  }
  if (faceDown) {
    return <div className="card back-red"></div>;
  } else {
    return <div className={cardClass}></div>;
  }
}
