// Importing Logic & Find Hand
import { PokerLogic } from "./logic.mjs";
import CardDeck from "./deck.mjs";

export default class Round {
    // Pre flop =(Flop)> Post Flop =(Turn)> Post Turn =(River)> Post River =>  ShowDown
    constructor(controller) {
        // Setting Deck
        this.deck = new CardDeck();
        this.controller = controller;

        // Getting Poker Logic
        this.poker_logic = new PokerLogic(this.deck);

        // Setting State
        this.state = "pre_flop";
        this.readable_state = "Pre Flop"

        this.current_betting_amount = 0;
    }

    next() {
        if (this.state == "pre_flop") {
            this.deck.deal_community_cards(3);
            this.current_betting_amount = 0;

            this.state = "post_flop";
            this.readable_state = "Post Flop";
        } else if (this.state == "post_flop") {
            this.deck.deal_community_cards(1);
            this.current_betting_amount = 0;

            this.state = "post_river";
            this.readable_state = "Post River";
        } else if (this.state == "post_river") {
            this.deck.deal_community_cards(1);
            this.current_betting_amount = 0;

            this.state = "showdown";
            this.readable_state = "Showdown";
        } else if (this.state == "showdown") {
            console.log("SHOW DOWN");
        }
    }

    start() {
        // Setting Up Deck
        this.deck.set_current_deck();
        this.deck.shuffle_deck();
        this.deck.deal_player_cards(this.controller);

        this.current_betting_amount = 0;

        this.state = "pre_flop";
        this.readable_state = "Pre Flop";
    }

    set_new(controller) {
        this.controller = controller;
        this.deck = new CardDeck();

        this.poker_logic = new PokerLogic(this.deck);

        this.state = "pre_flop";
    } 
}
