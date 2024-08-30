// Importing Logic & Find Hand
import FindHand from "./find_hand.mjs";
import { PokerLogic } from "./logic.mjs";

class Round {
    //   Preflop =(Flop)> Post Flop =(Turn)> Post Turn =(River)> Post River =>  ShowDown
    constructor(deck, controller) {
        // Setting Deck
        this.deck = deck;
        this.controller = controller;

        // Getting Poker Logic
        this.poker_logic = new PokerLogic(this.deck);

        // Setting State
        this.state = "preflop";
    }
}
