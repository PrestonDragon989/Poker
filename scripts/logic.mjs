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
        
        // Setting Hand Ranks
        const handRank = ["royalFlush", "straightFlush", "fourOfAKind", "fullHouse", "flush", "straight", "threeOfAKind", "twoPair", "pair", "high"];
        
        // Getting all hands
        let handTypes = [];
        hands.forEach(hand => {
            handTypes.push([this.findValueHand(hand, tableCards)[0], hands.indexOf(hand) + 1]);
        })

        console.log(handTypes);

        // Getting The highest Hand(s) there
        let bestRank = "high";
        let foundRank = false;
        for (let i = 0; i < handRank.length; i++) {
            if (!foundRank) {
                handTypes.forEach(hand => {
                    if (handRank[i] === hand[0]) {
                        bestRank = handRank[i];
                        foundRank = true;
                    }
                })
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
        let hands = [playerHand].concat(npcHands);

        // Setting best hands into a list
        bestHandNumbers.forEach(index => {
            bestHands.concat(hands[index]);
        })

        // Finding out what hand it is
        let hand = this.findValueHand(hands[bestHandNumbers[0] - 1], tableCards)[0];
        
        // Breaking ties if need be
        if (hand === "high") {
            // Setting card hiearchy
            const highCards = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

            // Getting Each hands best card
            let bestCards = [];
            hands.forEach(hand => {
                if (hand[0][0] === 1 || hand[1][0] === 1) bestCards.push(1);
                else bestCards.push(Math.max(...hand.map(sublist => sublist[0])));
            })

            // Getting Best Card of all
            let bestCard = Math.max(...bestCards);
            if (bestCards.includes(1)) bestCard = 1;

            // Returning Best High Card(s)
            return bestCards.reduce((acc, element, index) => {
                if (element === bestCard) {
                  acc.push(index + 1);
                }
                return acc;
            }, []);
        } else if (hand === "pair") {
            console.log("Pair detection");
            // Setting up pair rankings
            const pairs = [[1, 1], [13, 13], [12, 12], [11, 11], [10, 10], [9, 9], [8, 8], [7, 7], [6, 6], [5, 5], [4, 4], [3, 3], [2, 2]];

            // Getting Pairs
            let pairHands = [];
            hands.forEach(hand => {
                // Getting Total Cards
                let totalCards = [];
                totalCards.push(hand[0][0], hand[0][1]);
                tableCards.forEach(card => {totalCards.push(card[0])});

                // Setting up stop loop
                let foundPair = false;
                pairs.forEach(pair => {
                    if (totalCards.filter(element => element === pair[0]).length > 1 && !foundPair) {
                        foundPair = true;
                        pairHands.push(pair[0]);
                    }
                })
            })

            // Getting best pair in pairs
            let bestPair = Math.max(...pairHands);
            if (pairHands.includes(1)) bestPair = 1;

            // Checking to see if there is more than one of the same pair
            if (pairHands.filter(element => element === bestPair).length > 1) {
                let bestHighCards = [];
                hands.forEach(hand => {
                    if (hand[0] == 1 || hand[1] == 1) bestHighCards.push(1);
                    else bestHighCards.push(Math.max(...hands.map(sublist => sublist[0])))
                })

                let bestHighCard = Math.max(...bestHighCards);
                if (bestHighCards.includes(1)) bestHighCard = 1;

                // Checking for second cards
                if (bestHighCards.filter(element => element === bestHighCard).length > 1) {
                    let bestSecondHighCards = [];
                    hands.forEach(hand => {
                        bestSecondHighCards.push(Math.min(...hands.map(sublist => sublist[0])))
                    })
    
                    let bestHighCard = Math.max(...bestSecondHighCards);
                }
            } else {console.log([pairHands.indexOf(bestPair + 1)]); return [pairHands.indexOf(bestPair) + 1];}
        }
    }
}

export {PokerLogic};