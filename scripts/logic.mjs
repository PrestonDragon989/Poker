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
            return ["straight", cards];
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

    findBestHands(playerHand, npcHands, tableCards) {
        // Combining Hands
        const hands = playerHand.concat(npcHands);
        
        // Setting Hand Ranks
        const handRank = ["royalFlush", "straightFlush", "fourOfAKind", "fullHouse", "flush", "straight", "threeOfAKind", "twoPair", "pair", "high"];
        
        // Getting all hands
        let handTypes = [];
        hands.forEach(hand => {
            handTypes.push([this.findValueHand(hand, tableCards)[0], hands.indexOf(hand) + 1]);
        })

        // Getting The highest Hand(s) there
        let bestRank = "high";
        for (let i = 0; i > handRank.length; i++) {//handRank.forEach(hand => {
            let hand = handTypes[i];
            if (hand in handRank && !foundRank) {
                bestRank = hand;
                console.log(bestRank);
                break;
            } 
        }

        // Getting All hands of the best
        let bestHands = [];
        handTypes.forEach(hand => {
            if (hand[0] === bestRank) bestHands.push(hand[1]);
        });

        // Returning the best hands
        return bestHands;
    }

    findWinner(playerHand, npcHands, tableCards) {
        // Getting Best hands Indexes
        let bestHandNumbers = this.findBestHands(playerHand, npcHands, tableCards);
        console.log(bestHandNumbers);
        // Returning Best hand if there is only one winner
        if (bestHandNumbers.length === 1) return bestHandNumbers;

        // Setting up for tie break
        let bestHands = [];

        // Getting All hands
        let hands = playerHand.concat(npcHands);

        // Setting best hands into a list
        bestHandNumbers.forEach(index => {
            bestHands.concat(hands[index]);
        })

        // Finding out what hand it is
        let hand = new FindHand(hands[0], tableCards);

        // Breaking ties if need be
        if (hand[0] === "high") {
            // Getting Highest Card in table Cards
            const highestTableCard = Math.max(...tableCards.map(cardList => cardList[0]));
            const betterThanTableHands = [];
            bestHands.forEach(hand => {
                if (hand[0][0] === 1 || hand[1][0] === 1) {
                    if (highestTableCard >= 2) betterThanTableHands.push(bestHands.indexOf(hand));
                }
                else if (hand[0][0] > highestTableCard || hand[1][0] > highestTableCard) betterThanTableHands.push(bestHands.indexOf(hand));
            })
            if (betterThanTableHands.length === 1) return [betterThanTableHands.length];
            else if (betterThanTableHands.length === 0) return bestHandNumbers;

        } else if (hand[0] === "pair") {

        }
    }
}

export {PokerLogic};