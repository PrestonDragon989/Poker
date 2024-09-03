export default class SimpleDealbreakers {
    constructor() {
        this.straights = [
            [1, 2, 3, 4, 5],     // Ace to 5
            [2, 3, 4, 5, 6],     // 2 to 6
            [3, 4, 5, 6, 7],     // 3 to 7
            [4, 5, 6, 7, 8],     // 4 to 8
            [5, 6, 7, 8, 9],     // 5 to 9
            [6, 7, 8, 9, 10],    // 6 to 10
            [7, 8, 9, 10, 11],   // 7 to Jack
            [8, 9, 10, 11, 12],  // 8 to Queen
            [9, 10, 11, 12, 13], // 9 to King
            [1, 10, 11, 12, 13]  // 10 to Ace
        ];
    }

    get_high_cards(cards) {
        let true_filtered = [];
        let ace_accounted = [];
        cards.forEach(([c, suit, img], i) => {
            true_filtered.push(c);
            if (c == 1)
                ace_accounted.push(14);
            else
                ace_accounted.push(c);
        })
        const sorted_relative_cards = ace_accounted.slice().sort((a, b) => b - a);
        const sorted_true_cards = true_filtered.slice().sort((a, b) => b - a);

        return {"true": sorted_true_cards, "relative": sorted_relative_cards};
    }

    get_highest_card_hand(high_card_indices) {
        let highest = 0;
        let top_indices = [];
        Object.entries(high_card_indices).forEach(([index, cards], i) => {
            if (cards[0] > highest) {
                highest = cards[0]
                top_indices.length = 0;
                top_indices.push(index);
            }
        });
        if (top_indices.length > 1) {
            Object.entries(high_card_indices).forEach(([index, cards], i) => {
                if (cards[1] > highest) {
                    highest = cards[1]
                    top_indices.length = 0;
                    top_indices.push(index);
                }
            });
        }
        return top_indices;
    }

    get_highest_pairs(cards) {
        let gone_through_cards = [];
        let high_pair_numbers = [];
        cards.forEach((card, i) => {
            if (gone_through_cards.includes(card))
                high_pair_numbers.push(card);
            gone_through_cards.push(card)
        })
        return high_pair_numbers.slice().sort((a, b) => b - a);
    }

    flush_dealbreaker(indices_to_flushed) {
        let mapped_flushed_indices = {};
        let indices = []
        Object.entries(indices_to_flushed).forEach(([index, cards], i) => {
            mapped_flushed_indices[index] = cards.map(card => card[0]).slice().sort((a, b) => b - a);
            indices.push(index);
        });
        console.log(mapped_flushed_indices);
        for (let i = 0; i < 5; i++) {
            let top = 0;
            let best_indices = [];
            indices.forEach(index => {
                if (mapped_flushed_indices[index][i] > top) {
                    console.log(mapped_flushed_indices[index][i]);
                    best_indices.length = 0;
                    best_indices.push(index)
                    top = mapped_flushed_indices[index][i];
                } else if (mapped_flushed_indices[index][i]) {
                    best_indices.push(index);
                }
            })
            if (best_indices.length == 1) {
                console.log("Ended on ", i);
                return best_indices;
            }
        }
        console.log("Out of 5 card range");
    }

    get_three_of_a_kind_dealbreaker_index(indices_to_raw) {
        let highest = 0;
        let winning_index = 0;
        Object.entries(indices_to_raw).forEach(([index, cards], i) => {
            for (let i = 1; i < 15; i++) {
                if (cards.filter(element => element === i).length == 3) {
                    if (i == 1)
                        return index;
                    else if (i > highest) {
                        highest = i;
                        winning_index = index;
                    }
                }
            }
        });
        return winning_index;
    }

    get_four_of_a_kind_dealbreaker_index(indices_to_raw) {
        let highest = 0;
        let winning_index = 0;
        Object.entries(indices_to_raw).forEach(([index, cards], i) => {
            for (let i = 1; i < 15; i++) {
                if (cards.filter(element => element === i).length == 4) {
                    if (i == 1)
                        return index;
                    else if (i > highest) {
                        highest = i;
                        winning_index = index;
                    }
                }
            }
        });
        return winning_index;
    }

    get_duplicates_value(cards, value) {
        for (let i = 1; i < 15; i++) {
            if (cards.filter(v => v === i).length == value) {
                return i;
            }
        }
    }

    get_two_pairs_ranks(cards) {
        let top_two_numbers = [];
        for (let i = 0; i < 2; i++) {
            for (let i = 15; i > 0; i--) {
                if (cards.filter(c => c === i).length == 2) {
                    if (top_two_numbers.length != 2) {
                        top_two_numbers.push(i);
                    } else if (top_two_numbers == 2) {
                        return top_two_numbers;
                    }
                }
            }
        }
        return top_two_numbers;
    }

    get_straight_rank(cards) {
        const sorted_cards = [...new Set(cards)].sort((a, b) => a - b);
        let rank = 1;
        for (const straight of this.straights) {
            if (straight.every(value => sorted_cards.includes(value))) {
                return rank;
            } else {
                rank += 1;
            } 
        }
    }
}
