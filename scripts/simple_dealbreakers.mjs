export default class SimpleDealbreakers {
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
}
