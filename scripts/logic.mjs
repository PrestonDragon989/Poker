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

    get_hand_value(player, tableCards) {
        console.log(player);
        const found_hand = new FindHand(player.cards_to_list(), tableCards)
        console.log(found_hand.get_hand_rank());
    }
}
