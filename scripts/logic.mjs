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

    findWinner(playerHand, npcHands, tableCards) {
        const playerResult = this.findValueHand(playerHand, tableCards);
        const npcResults = npcHands.map(hand => this.findValueHand(hand, tableCards));
    
        const allHands = [playerResult, ...npcResults];
    
        // Sort hands by poker hand rank (highest to lowest)
        allHands.sort((a, b) => {
            const rankOrder = [
                "royalFlush", "straightFlush", "fourOfKindFound", "fullHouse", 
                "flush", "Straight", "threeOfAKind", "twoPair", "pair", "high"
            ];
            return rankOrder.indexOf(b[0]) - rankOrder.indexOf(a[0]);
        });
    
        const winners = [1]; // Player is always index 1
    
        // Check for ties
        for (let i = 1; i < allHands.length; i++) {
            if (allHands[i][0] === allHands[0][0]) {
                // Check for tie-breaking
                let winnerFound = false;
                for (let j = 1; j < allHands[0].length; j++) {
                    if (allHands[i][j] > allHands[0][j]) {
                        winners.splice(0); // Clear previous winners
                        winners.push(i + 1); // NPC index is i + 1
                        winnerFound = true;
                        break;
                    } else if (allHands[i][j] < allHands[0][j]) {
                        winnerFound = true;
                        break;
                    }
                }
                if (!winnerFound) {
                    // If there is a tie in hand strength, return both players
                    winners.push(i + 1); // NPC index is i + 1
                }
            } else {
                break;
            }
        }
    
        return winners;
    }    
    
}
export {PokerLogic};