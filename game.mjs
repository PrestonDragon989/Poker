// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import {drawHollowRect, drawPlayerCards, drawBaseTableCardPlatform, drawBasePlayerCardPlatform, drawFilledRoundedRect, drawHollowRoundedRect, drawTableCards, drawTableCardSpots, drawCompleteTable, drawCompletePlayerCards, goldenOutline, clearScreen} from "./scripts/render.mjs"; 

class Poker {
    constructor() {
        // Frame Time for FPS
        this.lastFrameTime = 0;

        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        // Button handlers
        this.checkButton = document.getElementById("check-button");
        this.raiseButton = document.getElementById("confirm-bet");
        this.foldButton = document.getElementById("fold-button");

        this.buttonPushed = {
            check: false,
            raise: false,
            fold: false
        }

        // Bet Slider Handler
        this.betSlider = document.getElementById("betting-slider");
        this.betValue = this.betSlider.value;

        // Text Block Handlers
        this.currentMoneyBox = document.getElementById("current-money");
        this.currentMoneyBetBox = document.getElementById("money-bet");

        // Card Deck
        this.deck = new CardDeck(1);
        
        // Game Variables
        this.playerMoney = 100;
        this.lastMoney = this.playerMoney;

        this.pot = 0;
        this.currentRaise = 0;

        // Game State
        this.state = "transition";

        this.deck.setCurrentDeck();
        this.deck.shuffleDeck();
        this.deck.dealPlayerCards();

        this.deck.dealTableCards(4);

        this.addEventListeners();
    }

    addEventListeners() {
        // Adding Slider Detection & Showing
        this.betSlider.addEventListener("input", () => {
            this.currentMoneyBetBox.innerText = "Money Bet: " + this.betSlider.value;
            this.betValue = this.betSlider.value;
        });

        // Adding Button Click Detection
        this.checkButton.addEventListener("click", () => {
            this.buttonPushed.check = true;
            alert("Check Pressed");
        });
        this.foldButton.addEventListener("click", () => {
            this.buttonPushed.fold = true;
            alert("Fold Pressed");
        });
        this.raiseButton.addEventListener("click", () => {
            this.buttonPushed.raise = true;
            console.log("Raised to "+ this.betValue);
            this.playerMoney -= this.betValue;
        });
    }

    // Update Features
    updateSlider() {
        if (this.playerMoney != this.lastMoney) {
            this.betSlider.min = 1;
            this.betSlider.max = this.playerMoney;
            this.betSlider.value = 1;
            this.lastMoney = this.playerMoney;
        }
    }

    // Game Functions
    render() {
        // Clearing Screen
        clearScreen(this.ctx, this.pokerCanvas);

        // Drawing Player Cards
        drawCompletePlayerCards(this.ctx, this.deck);

        // Draw Table Cards
        drawCompleteTable(this.ctx, this.deck);
    }

    update() {
        this.currentMoneyBox.innerText = "Current Money: " + this.playerMoney;
        this.updateSlider();
        if (this.state === "transition") {
            this.buttonPushed.check = false;
            this.buttonPushed.fold = false;
            this.buttonPushed.raise = false;
        }
    }

    gameLoop(timestamp) {
        // Calculate the elapsed time since the last frame
        const elapsed = timestamp - this.lastFrameTime;

        // Update the last frame time
        this.lastFrameTime = timestamp;

        // Update The Game
        this.update();

        // Render the game
        this.render();

        // Call gameLoop again on the next frame
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}

// Starting Game When Page Loads
addEventListener("DOMContentLoaded", function() {
    const poker = new Poker();
    poker.gameLoop();
});