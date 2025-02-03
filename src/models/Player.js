export class Player {
  constructor(name, money = 2000, onHandUpdate) {
    this.name = name; // Player's name
    this.hand = []; // Cards in player's hand
    this.money = money; // Starting money
    this.onHandUpdate = onHandUpdate;
  }

  drawCard(card) {
    this.hand.push(card);
    this.onHandUpdate([...this.hand]);
  }

  emptyHand() {
    this.hand = [];
    this.onHandUpdate([]);
  }

  //returns object e.q.  {value: 15, html: 15}
  //value is used for functionality
  //html is to present to client
  calculateHand() {
    const score = this.hand.reduce((total, card) => total + card.value, 0);
    //if hand value is over 21 make value 0;
    if (score > 21) {
      return { value: 0, html: score };
    } else {
      return { value: score, html: score };
    }
  }
}
