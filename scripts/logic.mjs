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
            return ["royalFlush", cards];
        } else if (new FindHand(hand, tableCards).isStraightFlush()) {
            return ["straightFlush", cards];
        } else if (new FindHand(hand, tableCards).isFourOfAKind()) {
            return ["fourOfKindFound", cards];
        } else if (new FindHand(hand, tableCards).isFullHouse()) {
            return ["fullHouse", cards];
        } else if (new FindHand(hand, tableCards).isFlush()) {
            return ["flush", cards];
        } else if (new FindHand(hand, tableCards).isStraight()) {
            return ["straight", cards];
        } else if (new FindHand(hand, tableCards).isThreeOfAKind()) {
            return ["threeOfAKind", cards];
        } else if (new FindHand(hand, tableCards).isTwoPair()) {
            return ["twoPair", cards];
        } else if (new FindHand(hand, tableCards).isPair()) {
            return ["pair", cards];
        } else {
            return ["high", cards, new FindHand(hand, tableCards).findHighCard()];
        }
    }

    findBestHands(playerHand, npcHands, tableCards) {
        // Combining Hands
        const hands = [playerHand].concat(npcHands);
        console.log(hands);
        
        // Setting Hand Ranks
        const handRank = ["royalFlush", "straightFlush", "fourOfAKind", "fullHouse", "flush", "straight", "threeOfAKind", "twoPair", "pair", "high"];
        
        // Getting all hands
        let handTypes = [];
        let handRanks = [];
        hands.forEach(hand => {
            handTypes.push([this.findValueHand(hand, tableCards)[0], hands.indexOf(hand) + 1]);
            handRanks.push(this.findValueHand(hand, tableCards)[0]);
        });

        console.log(handRanks);

        // Getting The highest Hand(s) there
        let bestRank = "high";
        for (var i = 0; i < handRank.length; i++) {
            if (handRanks.includes(handRank[i])) {
                bestRank = handRank[i];
                console.log(bestRank);
                break;
            } console.log(handRank[i]);
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
        let hands = [playerHand].concat(npcHands);

        // Setting best hands into a list
        bestHandNumbers.forEach(index => {
            bestHands.concat(hands[index]);
        })

        // Finding out what hand it is
        let hand = this.findValueHand(hands[bestHandNumbers[0] - 1], tableCards)[0];
        
        // Breaking ties if need be
        if (hand === "high") {
            // Getting Highest Card in table Cards
            const highestTableCard = Math.max(...tableCards.map(cardList => cardList[0]));

            // Getting cards that are higher
            let higherThenTableHands = [];
            hands.forEach(hand => {
                if (Math.max(...hand.map(cardList => cardList[0])) > highestTableCard) higherThenTableHands.push([hand, hands.indexOf(hand)]);
            });

            // Checking highest table card is the highest of all
            if (highestTableCard.length <= 0) return bestHandNumbers;

            // Getting the better of two cards from the hands
            let bestHighCardHands = [];
            hands.forEach(hand => {
                if (hand[0][0] > hand[1][0]) bestHighCardHands.push([hand[0][0], hands.indexOf(hand) + 1]);
                else bestHighCardHands.push([hand[1][0], hands.indexOf(hand) + 1]);
            });

            let highestCard = 0;
            let winningHands = [];
            bestHighCardHands.forEach(hand => {
                if (hand[0] > highestCard) {
                    highestCard = hand[0];
                    winningHands = [hand[1]];
                } else if (hand[0] === highestCard) {
                    winningHands.push(hand[1]);
                }
            });

            return winningHands;
        } else if (hand === "pair") {
            // Getting All Possible Pairs
            const handPairs = [[1, 1], [13, 13], [12, 12], [11, 11], [10, 10], [9, 9], [8, 8], [7, 7], [6, 6], [5, 5], [4, 4], [3, 3], [2, 2]];

            // Getting the Straight Numbers of each hand
            let rawHands = [];
            hands.forEach(hand => {
                let rawHand = [];
                hand.forEach(card => {
                    rawHand.push(card[0]);
                });
                tableCards.forEach(card => {
                    rawHand.push(card[0]);
                });
                rawHands.push(rawHand);
            });

            // Labeling Each Hand
            let handPairRankings = [];
            rawHands.forEach(hand => {
                let pairRank = 0;
                let nonPairCards = [];
                handPairs.forEach(pair => {
                    let count = hand.filter(card => card === pair[0]).length;
                    if (count === 2) {
                        pairRank = pair[0];
                        nonPairCards = hand.filter(card => card !== pair[0]);
                    }
                });
                handPairRankings.push(pairRank);
            });

            // Checking to see if there is only one good pair
            let bestPair = Math.max(...handPairRankings);

            // Return All of the best pair(s)
            let bestHands = [];
            handPairRankings.forEach(pairRank => {
                if (pairRank === bestPair) bestHands.push(handPairRankings.indexOf(pairRank) + 1);
            })
            return bestHands;
        }
    }
}

export {PokerLogic};