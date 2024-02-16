// Importing Deck
import CardDeck from "./scripts/deck.mjs";

class Poker {
    constructor() {
        // Getting Page Elemants and CTX for drawing
        this.pokerCanvas = document.getElementById("poker-canvas");
        this.playerCardCanvas = document.getElementById("player-card-canvas");
        this.PCctx = this.pokerCanvas.getContext("2d");
        this.PHctx = this.playerCardCanvas.getContext("2d");

        // Setting up Card Deck
        this.cardDeck = new CardDeck(1);

        this.PHctx.drawImage(this.cardDeck.cardSprites.clubs.eight, (this.playerCardCanvas.width / 2), 5, 70, 75);
    }
}

// Starting Game
const poker = new Poker();