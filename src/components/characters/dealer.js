import { Dealer } from "../../models/dealer";

export function dealerLogic(dealer, deck) {


    if (!(dealer instanceof Dealer)) {
        throw new Error("Parameter must be a player instance.\ndealer: ", dealer);
    }

    while(dealer.calculateHand() < 17) {
        dealer.drawCard(deck.pop());
    }
}