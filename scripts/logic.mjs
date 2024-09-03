// Importing Find hands to find the hands
import FindHand from "./find_hand.mjs";
import SimpleDealbreaker from "./simple_dealbreakers.mjs";

export class PokerLogic {
    constructor() {
        // NOTE: You the higher the number, the better
        this.hand_ranks = {
            "high_card": 1,
            "pair": 2,
            "two_pair": 3,
            "three_of_a_kind": 4,
            "straight": 5,
            "flush": 6,
            "full_house": 7,
            "four_of_a_kind": 8,
            "straight_flush": 9,
            "royal_flush": 10
        }
    }

    get_hand_value(player, community_cards) {
        const found_hand = new FindHand(player.cards_to_list(), community_cards)
        return found_hand.get_hand_rank();
    }

    get_highest_ranks_indices(base_player_ranks) {
        let highest_rank = 1;
        let indices = [];
        Object.entries(base_player_ranks).forEach(([index, rank], i) => {
            if (this.hand_ranks[rank] > highest_rank) {
                indices.length = 0;
                highest_rank = this.hand_ranks[rank];
            }
            if (this.hand_ranks[rank] == highest_rank)
                indices.push(index);
        })
        return indices;
    }

    get_winner_index(controller, community_cards) {
        let close_win = false;
        let base_player_ranks = {};
        Object.entries(controller.players).forEach(([index, player], i) => {
            base_player_ranks[index] = this.get_hand_value(player, community_cards);
        });
        let top_indices = this.get_highest_ranks_indices(base_player_ranks);
        
        console.log(controller.players);
        console.log(base_player_ranks);
        console.log(top_indices);
        if (top_indices.length == 1)
            return {"index": [top_indices[0]], "rank": base_player_ranks[top_indices[0]], "close": close_win};

        // Tie Breaking Logic
        close_win = true;
        let tiebreaker_rank_number = this.hand_ranks[base_player_ranks[top_indices[0]]];
        let simple_dealbreaker = new SimpleDealbreaker();

        if (this.hand_ranks["high_card"] == tiebreaker_rank_number) {
            let high_card_indices = {};
            let relative_hard_card_indices = {};
            top_indices.forEach((index, i) => {
                high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                relative_hard_card_indices[index] = high_card_indices[index]["relative"];
            });
            return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "high_card", "close": close_win};
        } else if (this.hand_ranks["pair"] == tiebreaker_rank_number) {
            let table_pair_check = new FindHand([], community_cards);
            if (table_pair_check.pair()) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "pair", "close": close_win};
            } else {
                let top_pair_indices = {};
                let raw_cards_for_indices = {}
                top_indices.forEach(index => {
                    raw_cards_for_indices[index] = controller.players[index].cards_to_list().concat(community_cards).map(sub_arr => sub_arr[0]);
                    top_pair_indices[index] = simple_dealbreaker.get_highest_pairs(raw_cards_for_indices[index])[0];
                    if (raw_cards_for_indices[index] == 1)
                        raw_cards_for_indices[index] = 14;
                    if (top_pair_indices[index] == 1)
                        top_pair_indices[index] = 14;
                })
                let top_pair = 0;
                let top_index = 0;
                let dupe_pair = 0;
                let dupe_index = 0;
                Object.entries(top_pair_indices).forEach((set) => {
                    const index = set[0];
                    const c = set[1];
                    if (c > top_pair) {
                        top_index = index[0];
                        top_pair = c;
                    } else if (c == top_pair) {
                        dupe_pair = c;
                        dupe_index = index;
                    }
                })
                if (dupe_pair >= top_pair) {
                    let high_card_indices = {};
                    let relative_hard_card_indices = {};
                    [top_index, dupe_index].forEach((index, i) => {
                        high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                        high_card_indices[index]["relative"] = high_card_indices[index]["relative"].filter(num => num !== dupe_pair);
                        relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                    });
                    return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "pair", "close": close_win};
                }

                return {"index": [top_index], "rank": "pair", "close": close_win};
            }
        } else if (this.hand_ranks["two_pair"] == tiebreaker_rank_number) {
            let pair_value_indices = {};
            top_indices.forEach(index => {
                const all_cards = controller.players[index].cards_to_list().concat(community_cards).map(card => card[0]);
                pair_value_indices[index] = simple_dealbreaker.get_two_pairs_ranks(all_cards);
            })

            for (let i = 0; i < 2; i++) {
                let best_value = 0;
                let best_index = [];
                top_indices.forEach(index => {
                    if (pair_value_indices[index][i] > best_value) {
                        best_value = pair_value_indices[index][i];
                        best_index.length = 0;
                        best_index.push(index)
                    } else if (pair_value_indices[index][i] == test_value) {
                        best_index.push(index)
                    }
                })
                if (best_index.length == 1)
                    return {"index": best_index, "rank": "two_pair", "close": close_win};
            }
            let high_card_indices = {};
            let relative_hard_card_indices = {};
            top_indices.forEach((index, i) => {
                high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                relative_hard_card_indices[index] = high_card_indices[index]["relative"];
            });
            return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "high_card", "close": close_win};

        } else if (this.hand_ranks["three_of_a_kind"] == tiebreaker_rank_number) {
            let indices_to_raw = {};
            top_indices.forEach((index, i) => {
                indices_to_raw[index] = controller.players[index].cards_to_list().concat(community_cards).map(sub_arr => sub_arr[0])
            });
            return {"index": [simple_dealbreaker.get_three_of_a_kind_dealbreaker_index(indices_to_raw)], "rank": "three_of_a_kind", "close": close_win};
        } else if (this.hand_ranks["straight"] == tiebreaker_rank_number) {
            alert("HALT")
            let index_straight_ranks = {};
            top_indices.forEach(index => {
                const all_cards = controller.players[index].cards_to_list().concat(community_cards).map(card => card[0]);
                index_straight_ranks[index] = simple_dealbreaker.get_straight_rank(all_cards);
            });

            let top_rank = 0;
            let win_indices = [];
            Object.entries(index_straight_ranks).forEach(([index, rank]) => {
                if (rank > top_rank) {
                    win_indices.length = 0;
                    win_indices.push(index);
                    top_rank = rank;
                }
            });
            
            if (win_indices.length > 1) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                win_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "high_card", "close": close_win};
            } else {
                return {"index": win_indices, "rank": "straight", "close": close_win};
            }

        } else if (this.hand_ranks["flush"] == tiebreaker_rank_number) {
            const on_table = new FindHand([], community_cards);
            if (on_table.flush()) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "flush", "close": close_win};
            }
            const suits = ['club', 'diamond', 'heart', 'spade'];
            let indices_to_flushed = {};
            top_indices.forEach((index, i) => {
                for (const suit of suits) {
                    let total_cards = controller.players[index].cards_to_list().concat(community_cards);
                    if (total_cards.filter(card => card[1] === suit).length >= 5) {
                        indices_to_flushed[index] = controller.players[index].cards_to_list().concat(community_cards).filter(card => card[1] === suit);
                    }
                }
            });
            const top_flushes = simple_dealbreaker.flush_dealbreaker(indices_to_flushed);
            if (top_flushes == undefined) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "flush", "close": close_win};
            }
            return {"index": top_flushes, "rank": "flush", "close": close_win};
        } else if (this.hand_ranks["full_house"] == tiebreaker_rank_number) {
            let indices_to_raw = {};
            top_indices.forEach((index, i) => {
                indices_to_raw[index] = controller.players[index].cards_to_list().concat(community_cards).map(sub_arr => sub_arr[0])
            });
            return {"index": [simple_dealbreaker.get_three_of_a_kind_dealbreaker_index(indices_to_raw)], "rank": "full_house", "close": close_win};
        } else if (this.hand_ranks["four_of_a_kind"] == tiebreaker_rank_number) {
            let indices_to_raw = {};
            top_indices.forEach((index, i) => {
                indices_to_raw[index] = controller.players[index].cards_to_list().concat(community_cards).map(sub_arr => sub_arr[0])
            });
            return {"index": [simple_dealbreaker.get_four_of_a_kind_dealbreaker_index(indices_to_raw)], "rank": "four_of_a_kind", "close": close_win};
        } else if (this.hand_ranks["straight_flush"] == tiebreaker_rank_number) {
            const on_table = new FindHand([], community_cards);
            if (on_table.flush()) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "straight_flush", "close": close_win};
            }

            const suits = ['club', 'diamond', 'heart', 'spade'];
            let indices_to_flushed = {};
            top_indices.forEach((index, i) => {
                for (const suit of suits) {
                    let total_cards = controller.players[index].cards_to_list().concat(community_cards);
                    if (total_cards.filter(card => card[1] === suit).length >= 5) {
                        indices_to_flushed[index] = controller.players[index].cards_to_list().concat(community_cards).filter(card => card[1] === suit);
                    }
                }
            });
            const top_flushes = simple_dealbreaker.flush_dealbreaker(indices_to_flushed);
            if (top_flushes == undefined) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "straight_flush", "close": close_win};
            }
            return {"index": top_flushes, "rank": "straight_flush", "close": close_win};
        } else if (this.hand_ranks["royal_flush"] == tiebreaker_rank_number) {
            const on_table = new FindHand([], community_cards);
            if (on_table.royal_flush()) {
                let high_card_indices = {};
                let relative_hard_card_indices = {};
                top_indices.forEach((index, i) => {
                    high_card_indices[index] = simple_dealbreaker.get_high_cards(controller.players[index].cards_to_list());
                    relative_hard_card_indices[index] = high_card_indices[index]["relative"];
                });
                return {"index": simple_dealbreaker.get_highest_card_hand(relative_hard_card_indices), "rank": "royal_flush", "close": close_win};
            } else {
                return {"index": top_indices, "rank": "royal_flush", "close": close_win};
            }
        } else {
            // NOTE: At this point might as well return them all, to prevent bugs.
            console.error("No tiebreaks triggered after no rank indices matched. Returning top indices by default.");
            return {"index": top_indices, "rank": "Magic?????", "close": close_win};
        }
    }
}
