export default class Player {
    constructor(index, cash) {
        // Setting up player id
        this.index = index;

        // Setting up their money & hand
        this.cash = cash;

        this.hand = {
            "1": null,
            "2": null
        }
    }

    cards_to_list() {
        return [this.hand[1], this.hand[2]];
    }
}
