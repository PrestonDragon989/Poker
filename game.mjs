// Importing Deck
import Round from "./scripts/round.mjs";
import { clear_screen, draw_full_player_cards, draw_full_community_cards, draw_full_pot } from "./scripts/render.mjs";
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

        // Setting All the Variables
        this.controller = new Controller(5, 1);
        this.controller.generate_players(100);

        // Round
        this.round = new Round(null);

        // Keeping Game state
        this.total_rounds = 0;
        this.game_over = false;
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
        this.controller = new Controller(5, 1);
        this.controller.generate_players(cash);

        this.round.set_new(this.controller);
        this.round.start();
    }

    // Game Functions
    render() {
        // Clearing Screen
        clear_screen(this.ctx, this.poker_canvas);

        // Drawing Player Cards & Input
        draw_full_player_cards(this.ctx, this.controller.get_main_player());
        this.input.render(this.ctx, this.total_rounds, this.round.readable_state);

        // Draw Table Cards & Pot
        draw_full_community_cards(this.ctx, this.round.deck);
        draw_full_pot(this.ctx, this.poker_canvas, this.round);
    }

    update() {
        this.input.update(this.controller, this.round.current_betting_amount);
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
    // Mobile App Logic
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    if (hasTouchScreen) {
        console.log("Mobile Device User Found");
    }

    console.log("Welcome to Poker! Thanks for checking out the console, by the way! This is an open source project, and can be found here: https://github.com/PrestonDragon989/Poker");
    
    let cash = parseInt(this.prompt("How much cash do you want everyone to start with:"))
    if (Number.isNaN(cash)) {
        cash = 100;
    }
    cash = Math.round(cash);

    const poker = new Poker();
    poker.start(cash);
    poker.gameLoop();
});
