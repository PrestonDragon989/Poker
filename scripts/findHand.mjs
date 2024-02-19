class FindHand {
    constructor(hand, tableCards) {
        this.cards = hand.concat(tableCards);
    }

    isRoyalFlush() {
        // Setting up predefined variables
        const suits = ['club', 'diamond', 'heart', 'spade'];
        const royalValues = [10, 11, 12, 13, 1];

        // Going through each card to see if it is a flush
        for (const suit of suits) {
            const royalFlush = royalValues.every(value => this.cards.some(card => card[0] === value && card[1] === suit));
            if (royalFlush) {
                return true;
            }
        }

        // Returning False if none found
        return false;
    }
    
    isStraightFlush() {
        // Check for a flush
        const flush = this.isFlush();

        if (!flush) {
            return false;
        }

        // Check for a straight
        const straight = this.isStraight();

        return straight;
    }

    isFourOfAKind() {
        const values = this.cards.map(card => card[0]);
    
        for (const value of values) {
            const count = values.filter(v => v === value).length;
            if (count === 4) {
                return true;
            }
        }
    
        return false;
    }    

    isFullHouse() {
        const values = this.cards.map(card => card[0]);
        const uniqueValues = [...new Set(values)];

        for (const value of uniqueValues) {
            const count = values.filter(v => v === value).length;
            if (count === 3) {
                for (const otherValue of uniqueValues) {
                    if (otherValue !== value && values.filter(v => v === otherValue).length === 2) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    isFlush() {
        const suits = ['club', 'diamond', 'heart', 'spade'];

        for (const suit of suits) {
            const flush = this.cards.filter(card => card[1] === suit).length >= 5;
            if (flush) {
                return true;
            }
        }

        return false;
    }

    isStraight() {
        const values = this.cards.map(card => card[0]);
        const uniqueValues = [...new Set(values)].sort((a, b) => a - b);
        const straightValues = [
            [1, 10, 11, 12, 13], // Ace to 10
            [1, 2, 3, 4, 5],     // Ace to 5
            [2, 3, 4, 5, 6],     // 2 to 6
            [3, 4, 5, 6, 7],     // 3 to 7
            [4, 5, 6, 7, 8],     // 4 to 8
            [5, 6, 7, 8, 9],     // 5 to 9
            [6, 7, 8, 9, 10],    // 6 to 10
            [7, 8, 9, 10, 11],   // 7 to Jack
            [8, 9, 10, 11, 12],  // 8 to Queen
            [9, 10, 11, 12, 13], // 9 to King
        ];

        for (const straight of straightValues) {
            if (straight.every(value => uniqueValues.includes(value))) {
                return true;
            }
        }

        return false;
    }

    isThreeOfAKind() {
        const values = this.cards.map(card => card[0]);

        for (const value of values) {
            const count = values.filter(v => v === value).length;
            if (count === 3) {
                return true;
            }
        }

        return false;
    }

    isTwoPair() {
        const values = this.cards.map(card => card[0]);
        const uniqueValues = [...new Set(values)];

        let pairs = 0;
        for (const value of uniqueValues) {
            const count = values.filter(v => v === value).length;
            if (count === 2) {
                pairs++;
            }
        }

        return pairs === 2;
    }

    isPair() {
        const values = this.cards.map(card => card[0]);
        const uniqueValues = [...new Set(values)];

        let pairs = 0;
        for (const value of uniqueValues) {
            const count = values.filter(v => v === value).length;
            if (count === 2) {
                pairs++;
            }
        }

        return pairs === 1;
    }

    findHighCard() {
        const values = this.cards.map(card => card[0]);
        return Math.max(...values);
    }
}
export default FindHand;