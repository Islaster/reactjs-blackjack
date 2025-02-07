import { Player } from "./Player";

export class NPC extends Player {
  constructor(name, difficulty, money = 2000, onHandUpdate, deck) {
    super(name, money, onHandUpdate);
    this.difficulty = difficulty; // Difficulty level (easy, medium, hard, expert)
    this.deck = deck; // Reference to the game's deck for decision-making
  }

  // Calculate the risk of busting based on the current hand value and the deck
  calculateRisk(handValue) {
    //hand value is a number
    console.log(this.difficulty, "hand value: ", handValue);
    const remainingCards = this.deck.length;
    const neededValue = 21 - handValue;
    console.log(this.difficulty, "neededValue: ", neededValue);

    // Count cards that would cause a bus
    const bustCards = this.deck.filter((card) => card.value > neededValue);
    console.log("card example", this.deck[0]);
    console.log("bustCards: ", bustCards);
    console.log("calculateRisK returns: ", bustCards.length / remainingCards);
    return bustCards.length / remainingCards; // Probability of busting
  }

  // Unique betting plan based on difficulty and current hand
  bet() {
    const handValue = this.calculateHand().value;
    let betAmount = 0;

    switch (this.difficulty) {
      case "easy":
        // Easy NPCs bet low regardless of hand value
        betAmount = Math.min(this.money, handValue * 10);
        break;

      case "medium":
        // Medium NPCs bet more aggressively based on hand value
        if (handValue > 15) {
          betAmount = Math.min(this.money, handValue * 20);
        } else {
          betAmount = Math.min(this.money, handValue * 10);
        }
        break;

      case "hard":
        // Hard NPCs bet high with confidence
        if (handValue > 18) {
          betAmount = Math.min(this.money, handValue * 30);
        } else if (handValue > 12) {
          betAmount = Math.min(this.money, handValue * 15);
        } else {
          betAmount = Math.min(this.money, 50);
        }
        break;

      case "expert":
        // Expert NPCs vary bets and bluff
        if (handValue > 18) {
          betAmount = Math.min(this.money, handValue * 40); // Aggressive
        } else if (handValue > 14) {
          betAmount = Math.min(this.money, handValue * 25); // Balanced
        } else {
          betAmount = Math.min(this.money, Math.random() * 100); // Bluff
        }
        break;

      default:
        // Default conservative betting
        betAmount = Math.min(this.money, 20);
        break;
    }

    //Check if NPC's bet exceeds available funds
    if (betAmount > this.money) {
      const bet = this.money;
      this.money = 0;
      console.log(bet);
      return bet;
    } else {
      this.money -= betAmount; // Deduct the bet amount from the NPC's money
      return betAmount; // Return the bet amount
    }
  }

  // Make decisions on whether to draw a card
  makeDecision(card) {
    const handValue = this.calculateHand().value;
    const risk = this.calculateRisk(handValue);
    console.log(this.difficulty, " hand value: ", handValue);
    //console.log("Risk: ", risk);

    switch (this.difficulty) {
      // Easy: Draw if under 16
      case "easy":
        if (handValue < 16) {
          this.drawCard(card);
        }
        break;
      case "medium":
        // Medium: Draw if under 17
        if (handValue < 17) {
          this.drawCard(card);
        }
        break;
      case "hard":
        //Hard: Draw if under 16 and risk is medium
        if (handValue < 16 && risk <= 0.5 && handValue !== 21) {
          this.drawCard(card);
        } else if (handValue >= 18 && risk <= 0.3) {
          // Hard: Draw if NPC is equal to over greater than 18 and risk is low
          this.drawCard(card);
        }
        break;
      case "expert":
        // Expert: Calculate risk and sometimes bluff
        if (handValue < 18 && risk <= 0.4) {
          this.drawCard(card);
        } else if (handValue >= 18 && Math.random() < 0.2) {
          // Bluff decision: Pretend confidence by staying
          console.log("staying hand");
          break;
        }
        break;
    }
  }
  setDeck(deck) {
    this.deck = deck;
  }
}
