// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import {drawPlayerCards, drawBaseTableCardPlatform, drawBasePlayerCardPlatform, drawFilledRoundedRect, drawHollowRoundedRect} from "./scripts/utils.mjs"; 

class Poker {
    constructor() {
        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        // Card Deck
        this.cardDeck = new CardDeck(1);
        console.log(this.cardDeck.playerHand);
        this.cardDeck.setCurrentDeck();
        this.cardDeck.shuffleDeck();
        this.cardDeck.dealPlayerCards();
        console.log(this.cardDeck.playerHand);

        drawBasePlayerCardPlatform(this.ctx);
        drawPlayerCards(this.ctx, this.cardDeck);
        drawBaseTableCardPlatform(this.ctx)

        console.log("image drawn  " + this.cardDeck.cardSprites.clubs.five.height);
    }
}

// Starting Game
addEventListener("DOMContentLoaded", function() {
    console.log("Check!");
    const poker = new Poker();
    console.log(poker.pokerCanvas.height, poker.pokerCanvas.width);
});