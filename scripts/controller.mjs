import Player from "./player.mjs";

export default class Controller {
    constructor(num_players, player_index) {
        this.number_of_players = num_players;
        this.player_index = player_index;

        this.players = {};
    }

    generate_players(cash) {
        this.players = {};
        for (let i = 0; i < this.number_of_players; i++) {
            this.players[String(i + 1)] = new Player(i, cash);
        }
    }

    get_main_player() {
        return this.players[this.player_index];
    }
}
