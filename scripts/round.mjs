// Importing Logic & Find Hand
import FindHand from "./findHand.mjs";
import { PokerLogic } from "./logic.mjs";

class Round {
    //   Preflop =(Flop)> Post Flop =(Turn)> Post Turn =(River)> Post River =>  ShowDown
    constructor(deck) {
        // Setting Deck
        this.deck = deck;

        // Getting Poker Logic
        this.pokerLogic = new PokerLogic(this.deck);

        // Setting State
        this.state = "preflop";
    }
}