// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import {drawBasePlayerCardPlatform, drawFilledRoundedRect, drawHollowRoundedRect} from "./scripts/utils.mjs"; 

class Poker {
    constructor() {
        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        // Card Deck
        this.cardDeck = new CardDeck(1);

        // Draw the image at the scaled size
        this.ctx.drawImage(this.cardDeck.cardSprites.clubs.five, 10, 20, 70, 100);

        drawBasePlayerCardPlatform(this.ctx);

        console.log("image drawn  " + this.cardDeck.cardSprites.clubs.five.height);
    }
}

// Starting Game
addEventListener("DOMContentLoaded", function() {
    console.log("Check!");
    const poker = new Poker();
    console.log(poker.pokerCanvas.height, poker.pokerCanvas.width);
});