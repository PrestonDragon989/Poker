export class SimpleDealbreakers {
    get_high_card(player) {
        let cards = player.cards_to_list();
        let rank = {
            "1": null,
            "2": null
        }
        if (cards[0] == 1)
            cards[0] += 13;
        if (cards[1] == 1)
            cards[1] += 13;

        if (cards[0] >= cards[1]) {
            rank["1"] = cards[0];
            rank["2"] = cards[1];
        } else {
            rank["1"] = cards[1];
            rank["2"] = cards[0];
        }
        return rank;
    }
}
