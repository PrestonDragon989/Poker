// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import {drawHollowRect, drawPlayerCards, drawBaseTableCardPlatform, drawBasePlayerCardPlatform, drawFilledRoundedRect, drawHollowRoundedRect, drawTableCards, drawTableCardSpots, drawCompleteTable, drawCompletePlayerCards, goldenOutline} from "./scripts/utils.mjs"; 

class Poker {
    constructor() {
        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        this.betSlider = document.getElementById("betting-slider");

        this.currentMoneyBox = document.getElementById("current-money");
        this.currentMoneyBetBox = document.getElementById("money-bet");

        // Card Deck
        this.cardDeck = new CardDeck(1);
        
        this.cardDeck.setCurrentDeck();
        this.cardDeck.shuffleDeck();
        this.cardDeck.dealPlayerCards();

        this.cardDeck.dealTableCards(4);

        drawCompleteTable(this.ctx, this.cardDeck);
        drawCompletePlayerCards(this.ctx, this.cardDeck);
        this.addSliderListener();
    }

    addSliderListener() {
        this.betSlider.addEventListener("input", () => {
            this.currentMoneyBetBox.innerText = "Money Bet: " + this.betSlider.value;
        });
    }    
}

// Starting Game When Page Loads
addEventListener("DOMContentLoaded", function() {
    const poker = new Poker();
});