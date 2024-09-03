// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import { PokerLogic } from "./scripts/logic.mjs";
import { clear_screen, draw_full_player_cards, draw_full_community_cards } from "./scripts/render.mjs";
import Controller from "./scripts/controller.mjs";
import Input from "./scripts/input.mjs";

class Poker {
    constructor() {
        // Frame Time for FPS
        this.last_frame_time = 0;

        // Getting Page Elements and CTX for drawing
        this.poker_canvas = document.getElementById("poker-canvas");
        this.ctx = this.poker_canvas.getContext("2d");

        // Setting Up Player input
        this.input = new Input();

        // Setting up Event listeners
        this.add_event_listeners();

        // Card Deck
        this.deck = new CardDeck();

        // Setting All the Variables
        this.controller = new Controller(5, 1);
        this.controller.generate_players(100);

        // DEBUG: All of this stuff is debug
        this.deck.set_current_deck();
        this.deck.shuffle_deck();
        this.deck.deal_player_cards(this.controller);

        this.deck.deal_community_cards(5);

        // NOTE: This is for testing the poker hand logic
        this.logic = new PokerLogic();
        this.winner_index = this.logic.get_winner_index(this.controller, this.deck.community_cards);
        console.log("Winner Index: ", this.winner_index);
    }

    add_event_listeners() {
        // Blocking right click menu
        this.poker_canvas.addEventListener("contextmenu", event => {
            event.preventDefault();
        });

        this.input.set_up_event_listeners(this.poker_canvas);
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
        clear_screen(this.ctx, this.poker_canvas);

        // Drawing Player Cards & Input
        draw_full_player_cards(this.ctx, this.controller.get_main_player());
        this.input.render(this.ctx);

        // Draw Table Cards
        draw_full_community_cards(this.ctx, this.deck);
    }

    update() {
        this.input.update(this.controller)
    }

    gameLoop(timestamp) {        
        // Calculate the elapsed time since the last frame
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
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } 
    if (hasTouchScreen) {
        const canvas = this.document.getElementById("poker-canvas");
        canvas.style.maxHeight = "calc(100vw - 24px);"
    }

    console.log("Welcome to Poker! Thanks for checking out the console, by the way! This is an open source project, and can be found here: https://github.com/PrestonDragon989/Poker");
    
    const poker = new Poker();
    poker.gameLoop();
});
