// Importing Find hands to find the hands
import FindHand from "./find_hand.mjs";

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
        console.log(base_player_ranks);
        let top_indices = this.get_highest_ranks_indices(base_player_ranks);
        console.log(top_indices);
        if (top_indices.length == 1)
            return {"index": top_indices[0], "rank": base_player_ranks[top_indices[0]], "close": close_win};
        else
            close_win = true;
    }
}
