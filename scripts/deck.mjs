class CardDeck {
    constructor(size) {
        // Deck size
        this.size = size;

        // Card Sprites
        this.cardSprites = {
            clubs: {
                ace: new Image(70, 100),
                two: new Image(70, 100),
                three: new Image(70, 100),
                four: new Image(70, 100),
                five: new Image(70, 100),
                six: new Image(70, 100),
                seven: new Image(70, 100),
                eight: new Image(70, 100),
                nine: new Image(70, 100),
                ten: new Image(70, 100),
                jack: new Image(70, 100),
                queen: new Image(70, 100),
                king: new Image(70, 100)
            },
            spades: {
                ace: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image(),
                seven: new Image(),
                eight: new Image(),
                nine: new Image(),
                ten: new Image(),
                jack: new Image(),
                queen: new Image(),
                king: new Image()
            },
            hearts: {
                ace: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image(),
                seven: new Image(),
                eight: new Image(),
                nine: new Image(),
                ten: new Image(),
                jack: new Image(),
                queen: new Image(),
                king: new Image()
            },
            diamonds: {
                ace: new Image(),
                two: new Image(),
                three: new Image(),
                four: new Image(),
                five: new Image(),
                six: new Image(),
                seven: new Image(),
                eight: new Image(),
                nine: new Image(),
                ten: new Image(),
                jack: new Image(),
                queen: new Image(),
                king: new Image()
            }
        }

        // Total Card deck
        this.allCards = [ // Diamonds, Spades, Clubs, Hearts
            [1, "diamond", "card-images/diamond-cards/ace-diamond.png"], [2, "diamond", "card-images/diamond-cards/two-diamond.png"], [3, "diamond", "card-images/diamond-cards/three-diamond.png"], [4, "diamond", "card-images/diamond-cards/four-diamond.png"], [5, "diamond", "card-images/diamond-cards/five-diamond.png"], [6, "diamond", "card-images/diamond-cards/six-diamond.png"], [7, "diamond", "card-images/diamond-cards/seven-diamond.png"], [8, "diamond", "card-images/diamond-cards/eight-diamond.png"], [9, "diamond", "card-images/diamond-cards/nine-diamond.png"], [10, "diamond", "card-images/diamond-cards/ten-diamond.png"], [11, "diamond", "card-images/diamond-cards/jack-diamond.png"], [12, "diamond", "card-images/diamond-cards/queen-diamond.png"], [13, "diamond", "card-images/diamond-cards/king-diamond.png"],
            [1, "spade", "card-images/spade-cards/ace-spade.png"], [2, "spade", "card-images/spade-cards/two-spade.png"], [3, "spade", "card-images/spade-cards/three-spade.png"], [4, "spade", "card-images/spade-cards/four-spade.png"], [5, "spade", "card-images/spade-cards/five-spade.png"], [6, "spade", "card-images/spade-cards/six-spade.png"], [7, "spade", "card-images/spade-cards/seven-spade.png"], [8, "spade", "card-images/spade-cards/eight-spade.png"], [9, "spade", "card-images/spade-cards/nine-spade.png"], [10, "spade", "card-images/spade-cards/ten-spade.png"], [11, "spade", "card-images/spade-cards/jack-spade.png"], [12, "spade", "card-images/spade-cards/queen-spade.png"], [13, "spade", "card-images/spade-cards/king-spade.png"],
            [1, "heart", "card-images/heart-cards/ace-heart.png"], [2, "heart", "card-images/heart-cards/two-heart.png"], [3, "heart", "card-images/heart-cards/three-heart.png"], [4, "heart", "card-images/heart-cards/four-heart.png"], [5, "heart", "card-images/heart-cards/five-heart.png"], [6, "heart", "card-images/heart-cards/six-heart.png"], [7, "heart", "card-images/heart-cards/seven-heart.png"], [8, "heart", "card-images/heart-cards/eight-heart.png"], [9, "heart", "card-images/heart-cards/nine-heart.png"], [10, "heart", "card-images/heart-cards/ten-heart.png"], [11, "heart", "card-images/heart-cards/jack-heart.png"], [12, "heart", "card-images/heart-cards/queen-heart.png"], [13, "heart", "card-images/heart-cards/king-heart.png"],
            [1, "club", "card-images/club-cards/ace-club.png"], [2, "club", "card-images/club-cards/two-club.png"], [3, "club", "card-images/club-cards/three-club.png"], [4, "club", "card-images/club-cards/four-club.png"], [5, "club", "card-images/club-cards/five-club.png"], [6, "club", "card-images/club-cards/six-club.png"], [7, "club", "card-images/club-cards/seven-club.png"], [8, "club", "card-images/club-cards/eight-club.png"], [9, "club", "card-images/club-cards/nine-club.png"], [10, "club", "card-images/club-cards/ten-club.png"], [11, "club", "card-images/club-cards/jack-club.png"], [12, "club", "card-images/club-cards/queen-club.png"], [13, "club", "card-images/club-cards/king-club.png"]
        ];

        // Playing Decks
        this.totalPlayingDeck;
        this.currentDeck;

        // Player Hands
        this.playerHands = [];

        // Cards currently on the table
        this.tableCards = [];

        // Loading Sprites
        this.loadCardSprites();
    }

    // Card Management functions (set deck, shuffle deck, deal cards, etc. . .)
    setCurrentDeck() {
        for (let i = 0; i < this.size; i++) {
            this.totalPlayingDeck = this.totalPlayingDeck.concat(this.allCards);
        }
    }

    shuffleDeck() {
        // Reseting player hands
        this.playerHands.forEach(hand => {
            hand = [];
        });

        // Reseting deck
        this.currentDeck = this.totalPlayingDeck.slice();

        // Shuffling Current Deck
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[r]] = [this.currentDeck[r], this.currentDeck[i]];
        }
    }

    dealCard() {
        // Dealing card, and removing it from the current deck
        const cardDealt = this.currentDeck[0];
        this.currentDeck.splice(0, 1);
        return cardDealt;
    }

    // Deal player and table cards
    dealPlayerCards() {
        this.playerHands.forEach(hand => {
            for (let i = 0; i < 2; i++) {
                hand.push(this.dealCard());
            }
        });
    }

    dealTableCards(numCards = 1) {
        for (let i = 0; i < numCards; i++) {
            this.tableCards.push(this.dealCard());
        }
    }

    // Setting up Card Sprites
    loadCardSprites() {
        // Loading Club Sprites
        this.cardSprites.clubs.ace.src = "card-images/club-cards/ace-club.png";
        this.cardSprites.clubs.two.src = "card-images/club-cards/two-club.png";
        this.cardSprites.clubs.three.src = "card-images/club-cards/three-club.png";
        this.cardSprites.clubs.four.src = "card-images/club-cards/four-club.png";
        this.cardSprites.clubs.five.src = "card-images/club-cards/five-club.png";
        this.cardSprites.clubs.six.src = "card-images/club-cards/six-club.png";
        this.cardSprites.clubs.seven.src = "card-images/club-cards/seven-club.png";
        this.cardSprites.clubs.eight.src = "card-images/club-cards/eight-club.png";
        this.cardSprites.clubs.nine.src = "card-images/club-cards/nine-club.png";
        this.cardSprites.clubs.ten.src = "card-images/club-cards/ten-club.png";
        this.cardSprites.clubs.jack.src = "card-images/club-cards/jack-club.png";
        this.cardSprites.clubs.queen.src = "card-images/club-cards/queen-club.png";
        this.cardSprites.clubs.king.src = "card-images/club-cards/king-club.png";

        // Loading Spade Sprites
        this.cardSprites.spades.ace.src = "card-images/spade-cards/ace-spade.png";
        this.cardSprites.spades.two.src = "card-images/spade-cards/two-spade.png";
        this.cardSprites.spades.three.src = "card-images/spade-cards/three-spade.png";
        this.cardSprites.spades.four.src = "card-images/spade-cards/four-spade.png";
        this.cardSprites.spades.five.src = "card-images/spade-cards/five-spade.png";
        this.cardSprites.spades.six.src = "card-images/spade-cards/six-spade.png";
        this.cardSprites.spades.seven.src = "card-images/spade-cards/seven-spade.png";
        this.cardSprites.spades.eight.src = "card-images/spade-cards/eight-spade.png";
        this.cardSprites.spades.nine.src = "card-images/spade-cards/nine-spade.png";
        this.cardSprites.spades.ten.src = "card-images/spade-cards/ten-spade.png";
        this.cardSprites.spades.jack.src = "card-images/spade-cards/jack-spade.png";
        this.cardSprites.spades.queen.src = "card-images/spade-cards/queen-spade.png";
        this.cardSprites.spades.king.src = "card-images/spade-cards/king-spade.png";

        // Heart Card Sources
        this.cardSprites.hearts.ace.src = "card-images/heart-cards/ace-heart.png";
        this.cardSprites.hearts.two.src = "card-images/heart-cards/two-heart.png";
        this.cardSprites.hearts.three.src = "card-images/heart-cards/three-heart.png";
        this.cardSprites.hearts.four.src = "card-images/heart-cards/four-heart.png";
        this.cardSprites.hearts.five.src = "card-images/heart-cards/five-heart.png";
        this.cardSprites.hearts.six.src = "card-images/heart-cards/six-heart.png";
        this.cardSprites.hearts.seven.src = "card-images/heart-cards/seven-heart.png";
        this.cardSprites.hearts.eight.src = "card-images/heart-cards/eight-heart.png";
        this.cardSprites.hearts.nine.src = "card-images/heart-cards/nine-heart.png";
        this.cardSprites.hearts.ten.src = "card-images/heart-cards/ten-heart.png";
        this.cardSprites.hearts.jack.src = "card-images/heart-cards/jack-heart.png";
        this.cardSprites.hearts.queen.src = "card-images/heart-cards/queen-heart.png";
        this.cardSprites.hearts.king.src = "card-images/heart-cards/king-heart.png";

        // Diamond Card Sources
        this.cardSprites.diamonds.ace.src = "card-images/diamond-cards/ace-diamond.png";
        this.cardSprites.diamonds.two.src = "card-images/diamond-cards/two-diamond.png";
        this.cardSprites.diamonds.three.src = "card-images/diamond-cards/three-diamond.png";
        this.cardSprites.diamonds.four.src = "card-images/diamond-cards/four-diamond.png";
        this.cardSprites.diamonds.five.src = "card-images/diamond-cards/five-diamond.png";
        this.cardSprites.diamonds.six.src = "card-images/diamond-cards/six-diamond.png";
        this.cardSprites.diamonds.seven.src = "card-images/diamond-cards/seven-diamond.png";
        this.cardSprites.diamonds.eight.src = "card-images/diamond-cards/eight-diamond.png";
        this.cardSprites.diamonds.nine.src = "card-images/diamond-cards/nine-diamond.png";
        this.cardSprites.diamonds.ten.src = "card-images/diamond-cards/ten-diamond.png";
        this.cardSprites.diamonds.jack.src = "card-images/diamond-cards/jack-diamond.png";
        this.cardSprites.diamonds.queen.src = "card-images/diamond-cards/queen-diamond.png";
        this.cardSprites.diamonds.king.src = "card-images/diamond-cards/king-diamond.png";
    }
}
export default CardDeck;