export class Dealer {
  constructor(name, onHandUpdate) {
    this.name = `Dealer ${name}`; // Dealer's name
    this.hand = []; // Cards in player's hand
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

  calculateHand() {
    const score = this.hand.reduce((total, card) => total + card.value, 0);
    if (score > 21) {
      return { value: 0, html: score };
    } else {
      return { value: score, html: score };
    }
  }

  makeDecision(card) {
    console.log(this.calculateHand());
    while (this.calculateHand().value < 17) {
      console.log(this.calculateHand().value);
      this.drawCard(card);
      if (this.calculateHand().value === 0) {
        break;
      }
    }
  }
}
