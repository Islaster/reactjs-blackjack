export class Dealer {
  constructor(name, onHandUpdate) {
    this.name = `Dealer ${name}`; // Dealer's name
    this.hand = []; // Cards in player's hand
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
    return this.hand.reduce((total, card) => total + card.value, 0);
  }
}
