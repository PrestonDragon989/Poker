// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import { PokerLogic } from "./scripts/logic.mjs";
import { clear_screen, draw_full_player_cards, draw_full_community_cards } from "./scripts/render.mjs";
import Controller from "./scripts/controller.mjs";

class Poker {
    constructor() {
        // Frame Time for FPS
        this.lastFrameTime = 0;

        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        this.addEventListeners();

        // Card Deck
        this.deck = new CardDeck();

        // Setting All the Variables
        this.controller = new Controller(5, 1);
        this.controller.generate_players(100);

        // DEBUG: All of this stuff is debug
        this.deck.set_current_deck();
        this.deck.shuffle_deck();
        this.deck.deal_player_cards(this.controller.players);

        this.deck.deal_community_cards(5);

        // NOTE: This is for testing the poker hand logic
        this.logic = new PokerLogic();
        this.winner_index = this.logic.get_winner_index(this.controller, this.deck.community_cards);
        console.log("Winner Index: ", this.winner_index);
    }

    addEventListeners() {
        // Blocking right click menu
        this.pokerCanvas.addEventListener("contextmenu", event => {
            event.preventDefault();
        });
    }

    // This starts or resets a game (Deck, Players)
    start(cash) {
        this.deck = new CardDeck();
        this.deck.set_current_deck();
        this.deck.shuffle_deck();

        this.controller = new Controller(5, 1);
        this.controller.generate_players(cash);
    }

    // Game Functions
    render() {
        // Clearing Screen
        clear_screen(this.ctx, this.pokerCanvas);

        // Drawing Player Cards
        draw_full_player_cards(this.ctx, this.controller.get_main_player());

        // Draw Table Cards
        draw_full_community_cards(this.ctx, this.deck);
    }

    update() {

    }

    gameLoop(timestamp) {
        // Calculate the elapsed time since the last frame
        const elapsed = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Update & Render
        this.update();
        this.render();

        // Recall the game loop
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}

// Starting Game When Page Loads
addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to Poker! Thanks for checking out the console, by the way! This is an open source project, and can be found here: https://github.com/PrestonDragon989/Poker");
    const poker = new Poker();
    poker.gameLoop();
});
