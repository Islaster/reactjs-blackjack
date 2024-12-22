import Card from "../card/card";

export default function Hand({ cards }) {
    return (
        <div className={`Hand`}>
            {cards?.value?.map((card, key) => (
                <Card cardInfo={card} faceDown={card.facedown} key={key} />
            ))}
        </div>
    )
}