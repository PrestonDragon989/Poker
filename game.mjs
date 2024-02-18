// Importing Deck
import CardDeck from "./scripts/deck.mjs";
import {drawBaseTableCardPlatform, drawBasePlayerCardPlatform, drawFilledRoundedRect, drawHollowRoundedRect} from "./scripts/utils.mjs"; 

class Poker {
    constructor() {
        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.ctx = this.pokerCanvas.getContext("2d");

        // Card Deck
        this.cardDeck = new CardDeck(1);

        drawBasePlayerCardPlatform(this.ctx);
        this.ctx.drawImage(this.cardDeck.cardSprites.clubs.five, 60, 414, 105, 150);
        this.ctx.drawImage(this.cardDeck.cardSprites.diamonds.four, 180, 414, 105, 150);
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