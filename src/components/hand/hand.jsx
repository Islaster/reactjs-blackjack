import Card from "../card/card";

export default function Hand({ cards }) {
  if (cards) {
    return (
      <div className={`Hand`}>
        {cards.map((card, key) => (
          <Card cardInfo={card} faceDown={card?.faceDown} key={key} />
        ))}
      </div>
    );
  }
}
