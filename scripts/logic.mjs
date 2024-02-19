// Importing Find hands to find the hands
import FindHand from "./findHand.mjs";

class PokerLogic {
    constructor(deck) {
        // Defining Card Deck
        this.deck = deck;
    }

    findValueHand(hand, tableCards) {
        // Adding Cards together
        let cards = hand.concat(tableCards);

        // Checking for royal flush
        if (new FindHand(hand, tableCards).isRoyalFlush()) {
            console.log("Found Royal Flush");
            return ["royalFlush", cards];
        } else if (new FindHand(hand, tableCards).isStraightFlush()) {
            console.log("Found Straight Flush");
            return ["straightFlush", cards];
        } else if (new FindHand(hand, tableCards).isFourOfAKind()) {
            console.log("Found Four Of Kind");
            return ["fourOfKindFound", cards];
        } else if (new FindHand(hand, tableCards).isFullHouse()) {
            console.log("Found Full House");
            return ["fullHouse", cards];
        } else if (new FindHand(hand, tableCards).isFlush()) {
            console.log("Found Flush");
            return ["flush", cards];
        } else if (new FindHand(hand, tableCards).isStraight()) {
            console.log("Found Straight");
            return ["Straight", cards];
        } else if (new FindHand(hand, tableCards).isThreeOfAKind()) {
            console.log("Found Three Of a Kind");
            return ["threeOfAKind", cards];
        } else if (new FindHand(hand, tableCards).isTwoPair()) {
            console.log("Found Two Pair");
            return ["twoPair", cards];
        } else if (new FindHand(hand, tableCards).isPair()) {
            console.log("Found Pair");
            return ["pair", cards];
        } else {
            console.log("Found High card " + new FindHand(hand, tableCards).findHighCard());
            return ["high", cards, new FindHand(hand, tableCards).findHighCard()];
        }
    }
}
export {PokerLogic};