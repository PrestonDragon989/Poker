export default class FindHand {
    constructor(hand, tableCards) {
        this.cards = hand.concat(tableCards);
        this.hand = hand;
        this.community_cards = tableCards;
    }

    get_hand_rank() {
        // This simple sends a string of what it is. Yes, I know, it's ugly.
        if (this.royal_flush())
            return "royal_flush";
        else if (this.straight_flush())
            return "straight_flush";
        else if (this.four_of_a_kind())
            return "four_of_a_kind";
        else if (this.full_house())
            return "full_house";
        else if (this.flush())
            return "flush"
        else if (this.straight())
            return "straight";
        else if (this.three_of_a_kind())
            return "three_of_a_kind";
        else if (this.pair())
            return "pair";
        else
            return "high_card";
    }

    royal_flush() {
        // Setting up predefined variables
        const suits = ['club', 'diamond', 'heart', 'spade'];
        const royal_values = [10, 11, 12, 13, 1];

        // Going through each card to see if it is a flush
        for (const suit of suits) {
            const royalFlush = royal_values.every(value => this.cards.some(card => card[0] === value && card[1] === suit));
            if (royalFlush) {
                return true;
            }
        }
        return false;
    }

    straight_flush() {
        // Check for a flush
        const flush = this.flush();

        if (!flush) {
            return false;
        }

        // Check for a straight
        const straight = this.straight();

        return straight;
    }

    four_of_a_kind() {
        const values = this.cards.map(card => card[0]);

        for (const value of values) {
            const count = values.filter(v => v === value).length;
            if (count === 4) {
                return true;
            }
        }

        return false;
    }

    full_house() {
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

    flush() {
        const suits = ['club', 'diamond', 'heart', 'spade'];

        for (const suit of suits) {
            const flush = this.cards.filter(card => card[1] === suit).length >= 5;
            if (flush) {
                return true;
            }
        }

        return false;
    }

    straight() {
        const values = this.cards.map(card => card[0]);
        const uniqueValues = [...new Set(values)].sort((a, b) => a - b);
        const straightValues = [
            [1, 2, 3, 4, 5],     // Ace to 5
            [2, 3, 4, 5, 6],     // 2 to 6
            [3, 4, 5, 6, 7],     // 3 to 7
            [4, 5, 6, 7, 8],     // 4 to 8
            [5, 6, 7, 8, 9],     // 5 to 9
            [6, 7, 8, 9, 10],    // 6 to 10
            [7, 8, 9, 10, 11],   // 7 to Jack
            [8, 9, 10, 11, 12],  // 8 to Queen
            [9, 10, 11, 12, 13], // 9 to King
            [1, 10, 11, 12, 13] // 10 to Ace
        ];
        let rank = 1;
        for (const straight of straightValues) {
            if (straight.every(value => uniqueValues.includes(value))) {
                console.log(rank);
                
                return true;
            } rank += 1;
        }

        return false;
    }

    three_of_a_kind() {
        const values = this.cards.map(card => card[0]);

        for (const value of values) {
            const count = values.filter(v => v === value).length;
            if (count === 3) {
                return true;
            }
        }

        return false;
    }

    two_pair() {
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

    pair() {
        const values = this.cards.map(card => card[0]);
        let gone_through = [];
        let found_pair = false;
        values.forEach((num, i) => {
            if (gone_through.includes(num)) {
                if (found_pair == false)
                    found_pair = true
                else if (found_pair == true)
                    return false;
            }
            gone_through.push(num);
        });
        return found_pair;
    }
}
