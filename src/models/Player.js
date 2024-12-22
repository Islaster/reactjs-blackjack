export class Player {
  constructor(name, money = 2000, onHandUpdate) {
    this.name = name; // Player's name
    this.hand = []; // Cards in player's hand
    this.money = money; // Starting money
    this.onHandUpdate = onHandUpdate;
  }

  drawCard(card) {;
    this.hand.push(card);
    this.onHandUpdate([...this.hand])
  }

  emptyHand() {
    this.hand = [];
    this.onHandUpdate([])
  }

  calculateHand() {
    console.log("hand: ",this.hand)
    return this.hand.reduce((total, card) => total + card.value, 0);
  }
}
